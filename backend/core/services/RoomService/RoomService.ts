import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { RoomRepository, GetManyByUserByOptions } from "../../repositories/RoomRepository/RoomRepository";
import { CreateRoomDto } from "../../repositories/RoomRepository/dto/CreateRoomDto";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { InvitationRepository } from "../../repositories/InvitationRepository/InvitationRepository";
import pubsub from "../../../infrastructure/pubsub";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import { AddOneInvitationDto } from "../../repositories/InvitationRepository/dto/AddOneInvitationDto";
import redisClient from "../../../infrastructure/db/redisClient";

@injectable()
export class RoomService {
  constructor(
    @inject(TYPES.RoomRepository) private roomRepository: RoomRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.InvitationRepository) private invitationRepository: InvitationRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
  ) {}

  async createRoom(dto: CreateRoomDto & { invitedUsersIds: number[] }) {
    const roomId = await this.roomRepository.addOne(dto);

    await this.userToRoomParticipationRepository.addOne({ roomId, userId: dto.creatorId });

    await this.roomRepository.updateOneById(roomId, {
      participantsCount: 1,
    });

    for (const invitedUserId of dto.invitedUsersIds) {
      await this.inviteUserToRoom({ roomId, inviterId: dto.creatorId, userId: invitedUserId });
    }

    const room = await this.roomRepository.getOneById(roomId);

    return room;
  }

  async fetchRoomById(roomId: number) {
    const room = await this.roomRepository.getOneById(roomId);

    return room;
  }

  async fetchUserRooms(userId: number, options: GetManyByUserByOptions) {
    const list = await this.roomRepository.getManyByUserId(userId, options);

    return list;
  }

  async inviteUserToRoom({ roomId, userId, inviterId }: AddOneInvitationDto) {
    const user = await this.userRepository.getById(userId);
    const room = await this.roomRepository.getOneById(roomId);

    const invitation = await this.invitationRepository.addOne({
      userId,
      roomId,
      inviterId,
    });

    await this.userRepository.updateOneById(userId, {
      invitationsCount: user.invitationsCount + 1,
    });

    pubsub.publish("ME_IS_INVITED_TO_ROOM", {
      meIsInvitedToRoom: {
        room,
        invitation,
        userId: userId,
      },
    });
  }

  async inviteUsersToRoom({ roomId, inviterId, invitedUsersIds }: { roomId: number; inviterId: number; invitedUsersIds: number[] }) {
    const room = await this.roomRepository.getOneById(roomId);

    for (const invitedUserId of invitedUsersIds) {
      const invitedUser = await this.userRepository.getById(invitedUserId);

      const invitation = await this.invitationRepository.addOne({
        userId: invitedUserId,
        roomId,
        inviterId,
      });

      await this.userRepository.updateOneById(invitedUser.id, {
        invitationsCount: invitedUser.invitationsCount + 1,
      });

      pubsub.publish("ME_IS_INVITED_TO_ROOM", {
        meIsInvitedToRoom: {
          room,
          invitation,
          userId: invitedUser.id,
        },
      });
    }

    await this.roomRepository.updateOneById(roomId, {
      pendingInvitationsCount: room.pendingInvitationsCount + invitedUsersIds.length,
    });
  }

  async removeUserFromRoom(userId: number, roomId: number) {
    const user = await this.userRepository.getById(userId);
    const room = await this.roomRepository.getOneById(roomId);

    await this.userToRoomParticipationRepository.deleteOneByPk(userId, roomId);

    await this.roomRepository.updateOneById(roomId, {
      participantsCount: room.participantsCount - 1,
    });

    pubsub.publish("ROOM_PARTICIPANT_LEFT", {
      roomParticipantLeft: user,
      roomId,
    });
  }

  async fetchUsersOnlineCountInRoom(roomId: number) {
    let count = 0;

    const userIds = (await this.userToRoomParticipationRepository.getManyByRoomId(roomId)).map((p) => p.userId);

    for (const userId of userIds) {
      const isOnline = (await redisClient.get(`user:${userId}:is_online`)) === "true";

      if (isOnline) {
        count++;
      }
    }

    return count;
  }

  async excludeUserFromRoom(roomId: number, userId: number) {
    const room = await this.roomRepository.getOneById(roomId);

    await this.roomRepository.updateOneById(roomId, {
      participantsCount: room.participantsCount - 1,
    });

    await this.userToRoomParticipationRepository.deleteOneByPk(userId, roomId);

    const updatedUser = await this.userRepository.getById(userId);
    const updatedRoom = await this.roomRepository.getOneById(roomId);

    pubsub.publish("USER_EXCLUDED_FROM_ROOM", {
      room: updatedRoom,
      user: updatedUser,
    });

    return updatedRoom;
  }

  async fetchRoomUnreadMessagesByUserCount({ roomId, userId }: { roomId: number; userId: number }) {
    const count = await redisClient.hGet(`rooms:${roomId}:unread_messages`, String(userId));

    return count || 0;
  }
}
