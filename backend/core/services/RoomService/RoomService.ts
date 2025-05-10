import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { RoomRepository } from "../../repositories/RoomRepository/RoomRepository";
import { CreateRoomDto } from "../../repositories/RoomRepository/dto/CreateRoomDto";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { InvitationRepository } from "../../repositories/InvitationRepository/InvitationRepository";
import pubsub from "../../../infrastructure/pubsub";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import redisClient from "../../../infrastructure/db/redisClient";
import { ScheduledMessagesCountRepository } from "../../repositories/ScheduledMessagesCountRepository/ScheduledMessagesCountRepository";
import { UserRoomNewMessagesCountRepository } from "../../repositories/UserRoomNewMessagesCountRepository/UserRoomNewMessagesCountRepository";
import { UserIsNotRoomParticipant, UserNotFound } from "../../errors/users";
import { RoomNotFound } from "../../errors/rooms";
import { AlreadyInvited } from "../../errors/invitations";
import { User } from "../../entities/User";
import { ExcludeUserFromRoomForbidden } from "../../errors/auth";
import { Invitation } from "../../entities/Invitation";

@injectable()
export class RoomService {
  constructor(
    @inject(TYPES.RoomRepository) private roomRepository: RoomRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.InvitationRepository) private invitationRepository: InvitationRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
    @inject(TYPES.ScheduledMessagesCountRepository) private scheduledMessagesCountRepository: ScheduledMessagesCountRepository,
    @inject(TYPES.UserRoomNewMessagesCountRepository) private userRoomNewMessagesCountRepository: UserRoomNewMessagesCountRepository,
  ) {}

  async createRoom(dto: CreateRoomDto & { invitedUsersIds: number[] }) {
    const room = await this.roomRepository.addOne(dto);
    await this.userRoomNewMessagesCountRepository.addOne({
      roomId: room.id,
      userId: dto.creatorId,
      count: 0,
    });

    pubsub.publish("NEW_ROOM", room);

    await this.userToRoomParticipationRepository.addOne({ roomId: room.id, userId: dto.creatorId });

    await this.roomRepository.updateOneById(room.id, {
      participantsCount: 1,
    });

    await this.scheduledMessagesCountRepository.addOne({
      userId: dto.creatorId,
      roomId: room.id,
      count: 0,
    });

    await this.inviteUsersToRoom({ roomId: room.id, currentUserId: dto.creatorId, invitedUsersIds: dto.invitedUsersIds });

    return room;
  }

  async fetchRoomById({ currentUserId, roomId }: { currentUserId: number; roomId: number }) {
    const isParticipant = !!(await this.userToRoomParticipationRepository.getOneByPk({ userId: currentUserId, roomId }));

    if (!isParticipant) {
      throw new RoomNotFound();
    }

    return this.roomRepository.getOneById(roomId);
  }

  async fetchInvitationRoom({ invitation }: { currentUserId: number; invitation: Invitation }) {
    return this.roomRepository.getOneById(invitation.roomId);
  }

  async fetchUserRooms({ currentUserId }: { currentUserId: number }) {
    const participations = await this.userToRoomParticipationRepository.getManyByUserId(currentUserId);
    const roomIds = participations.map((p) => p.roomId);

    if (roomIds.length === 0) {
      return [];
    }
    return this.roomRepository.getManyByIds(roomIds);
  }

  async inviteUsersToRoom({ roomId, currentUserId, invitedUsersIds }: { roomId: number; currentUserId: number; invitedUsersIds: number[] }) {
    let room = await this.roomRepository.getOneById(roomId);

    if (!room) {
      throw new RoomNotFound();
    }

    room = await this.roomRepository.updateOneById(roomId, {
      pendingInvitationsCount: room.pendingInvitationsCount + invitedUsersIds.length,
    });

    pubsub.publish("ROOM_PENDING_INVITATIONS_COUNT_CHANGE", {
      roomId: room.id,
      count: room.pendingInvitationsCount,
    });

    const invitedUsers: User[] = [];

    for (const invitedUserId of invitedUsersIds) {
      const user = await this.userRepository.getOneById(invitedUserId);

      if (!user) {
        throw new UserNotFound();
      }

      const invitation = await this.invitationRepository.getOneByPk(invitedUserId, roomId);

      if (invitation) {
        throw new AlreadyInvited();
      }

      invitedUsers.push(user);
    }

    for (const invitedUser of invitedUsers) {
      pubsub.publish("USER_INVITATIONS_COUNT_UPDATED", {
        userId: invitedUser.id,
        count: invitedUser.invitationsCount + 1,
      });

      const invitation = await this.invitationRepository.addOne({
        userId: invitedUser.id,
        roomId,
        inviterId: currentUserId,
      });

      await this.userRepository.updateOneById(invitedUser.id, {
        invitationsCount: invitedUser.invitationsCount + 1,
      });

      pubsub.publish("USER_INVITED_TO_ROOM", invitation);
    }
  }

  async leaveRoom({ currentUserId, roomId }: { currentUserId: number; roomId: number }) {
    const user = await this.userRepository.getOneById(currentUserId);
    let room = await this.roomRepository.getOneById(roomId);

    if (!room) {
      throw new RoomNotFound();
    }

    await this.userToRoomParticipationRepository.deleteOneByPk(currentUserId, roomId);

    room = await this.roomRepository.updateOneById(roomId, {
      participantsCount: room.participantsCount - 1,
    });
    await this.userRoomNewMessagesCountRepository.deleteOneByPk({
      roomId: room.id,
      userId: currentUserId,
    });

    pubsub.publish("ROOM_PARTICIPANT_LEFT", {
      room,
      user,
    });
    pubsub.publish("ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE", {
      roomId,
      count: await this.fetchUsersOnlineCountInRoom(roomId),
    });
  }

  async fetchUsersOnlineCountInRoom(roomId: number) {
    let count = 0;

    const userIds = (await this.userToRoomParticipationRepository.getManyByRoomId(roomId)).map((p) => p.userId);

    for (const userId of userIds) {
      const activeSessions = await redisClient.sMembers(`user:${String(userId)}:active_sessions`);

      if (activeSessions.length > 0) {
        count++;
      }
    }

    return count;
  }

  async excludeUserFromRoom({ currentUserId, roomId, userId }: { currentUserId: number; roomId: number; userId: number }) {
    let room = await this.roomRepository.getOneById(roomId);
    const user = await this.userRepository.getOneById(userId);

    if (!room) {
      throw new RoomNotFound();
    }

    if (room.creatorId !== currentUserId) {
      throw new ExcludeUserFromRoomForbidden();
    }

    if (!user) {
      throw new UserNotFound();
    }

    const participation = await this.userToRoomParticipationRepository.getOneByPk({ userId, roomId });

    if (!participation) {
      throw new UserIsNotRoomParticipant();
    }

    room = await this.roomRepository.updateOneById(roomId, {
      participantsCount: room.participantsCount - 1,
    });

    await this.userRoomNewMessagesCountRepository.deleteOneByPk({
      userId,
      roomId,
    });

    await this.userToRoomParticipationRepository.deleteOneByPk(userId, roomId);

    pubsub.publish("USER_EXCLUDED_FROM_ROOM", {
      room,
      user,
    });

    return room;
  }

  async fetchRoomNewMessagesCount({ roomId, userId }: { roomId: number; userId: number }) {
    const count = await this.userRoomNewMessagesCountRepository.getOneByPk({ roomId, userId });
    return count.count;
  }

  async fetchRoomParticipantsTyping(roomId: number) {
    const allParticipants = await this.userToRoomParticipationRepository.getManyByRoomId(roomId);
    const allParticipantsIds = allParticipants.map((p) => p.userId);
    const participantsTypingIds = [];

    for (const participantId of allParticipantsIds) {
      const sessionIds = await redisClient.sMembers(`rooms:${roomId}:participants:${participantId}:currently_typing_session_ids`);

      if (sessionIds.length > 0) {
        participantsTypingIds.push(participantId);
      }
    }

    return this.userRepository.getManyByIds(participantsTypingIds);
  }
}
