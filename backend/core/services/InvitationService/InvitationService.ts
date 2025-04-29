import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { InvitationRepository } from "../../repositories/InvitationRepository/InvitationRepository";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import pubsub from "../../../infrastructure/pubsub";
import { RoomRepository } from "../../repositories/RoomRepository/RoomRepository";
import { ScheduledMessagesCountRepository } from "../../repositories/ScheduledMessagesCountRepository/ScheduledMessagesCountRepository";
import { UserRoomNewMessagesCountRepository } from "../../repositories/UserRoomNewMessagesCountRepository/UserRoomNewMessagesCountRepository";
import { InvitationNotFound } from "../../errors/invitations";
import { RoomNotFound } from "../../errors/rooms";

@injectable()
class InvitationService {
  constructor(
    @inject(TYPES.InvitationRepository) private invitationRepository: InvitationRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
    @inject(TYPES.RoomRepository) private roomRepository: RoomRepository,
    @inject(TYPES.ScheduledMessagesCountRepository) private scheduledMessagesCountRepository: ScheduledMessagesCountRepository,
    @inject(TYPES.UserRoomNewMessagesCountRepository) private userRoomNewMessagesCountRepository: UserRoomNewMessagesCountRepository,
  ) {}

  async fetchPendingInvitationsToRoom({ roomId, currentUserId }: { roomId: number; currentUserId: number }) {
    const participation = await this.userToRoomParticipationRepository.getOneByPk({ roomId, userId: currentUserId });

    if (!participation) {
      throw new RoomNotFound();
    }

    return this.invitationRepository.getManyByRoomId(roomId);
  }

  async fetchInvitations({ currentUserId }: { currentUserId: number }) {
    return this.invitationRepository.getManyByUserId(currentUserId);
  }

  async acceptInvitation({ roomId, currentUserId }: { currentUserId: number; roomId: number }) {
    const invitation = await this.invitationRepository.getOneByPk(currentUserId, roomId);
    if (!invitation) {
      throw new InvitationNotFound();
    }
    await this.userRoomNewMessagesCountRepository.addOne({
      userId: currentUserId,
      roomId,
      count: 0,
    });
    let user = await this.userRepository.getOneById(currentUserId);
    let room = await this.roomRepository.getOneById(roomId);

    await this.userToRoomParticipationRepository.addOne({ userId: currentUserId, roomId });

    await this.invitationRepository.deleteOne(currentUserId, roomId);

    user = await this.userRepository.updateOneById(currentUserId, {
      invitationsCount: user.invitationsCount - 1,
    });

    room = await this.roomRepository.updateOneById(roomId, {
      participantsCount: room.participantsCount + 1,
      pendingInvitationsCount: room.pendingInvitationsCount - 1,
    });

    await this.scheduledMessagesCountRepository.addOne({
      userId: currentUserId,
      roomId,
      count: 0,
    });

    pubsub.publish("USER_ACCEPTED_INVITATION", invitation);
    pubsub.publish("NEW_ROOM", room);
    pubsub.publish("USER_INVITATIONS_COUNT_UPDATED", user);
    pubsub.publish("ROOM_PENDING_INVITATIONS_COUNT_CHANGE", room);
    pubsub.publish("ROOM_PARTICIPANT_JOINED", {
      roomParticipantJoined: user,
      roomId,
    });

    return invitation;
  }

  async rejectInvitation({ currentUserId, roomId }: { currentUserId: number; roomId: number }) {
    const invitation = await this.invitationRepository.getOneByPk(currentUserId, roomId);
    if (!invitation) {
      throw new InvitationNotFound();
    }
    let user = await this.userRepository.getOneById(currentUserId);
    let room = await this.roomRepository.getOneById(roomId);

    await this.invitationRepository.deleteOne(currentUserId, roomId);

    user = await this.userRepository.updateOneById(currentUserId, {
      invitationsCount: user.invitationsCount - 1,
    });

    room = await this.roomRepository.updateOneById(roomId, {
      pendingInvitationsCount: room.pendingInvitationsCount - 1,
    });

    const updatedRoom = await this.roomRepository.getOneById(roomId);

    pubsub.publish("USER_REJECTED_INVITATION", invitation);
    pubsub.publish("USER_INVITATIONS_COUNT_UPDATED", user);
    pubsub.publish("ROOM_PENDING_INVITATIONS_COUNT_CHANGE", room);
    pubsub.publish("ROOM_PENDING_INVITATIONS_COUNT_CHANGE", {
      roomPendingInvitationsCountChange: updatedRoom,
    });

    return invitation;
  }
}

export default InvitationService;
