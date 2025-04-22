import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { InvitationRepository } from "../../repositories/InvitationRepository/InvitationRepository";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import pubsub from "../../../infrastructure/pubsub";
import { RoomRepository } from "../../repositories/RoomRepository/RoomRepository";
import { ScheduledMessagesCountRepository } from "../../repositories/ScheduledMessagesCountRepository/ScheduledMessagesCountRepository";
import { UserRoomNewMessagesCountRepository } from "../../repositories/UserRoomNewMessagesCountRepository/UserRoomNewMessagesCountRepository";

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

  async fetchPendingInvitationsToRoom(roomId: number) {
    return this.invitationRepository.getManyByRoomId(roomId);
  }

  async fetchUserInvitations(userId: number) {
    const invitations = await this.invitationRepository.getManyByUserId(userId);

    return invitations;
  }

  async fetchInvitorByRoomId(roomId: number) {
    const invitation = await this.invitationRepository.getOneByRoomId(roomId);

    if (invitation) {
      const invitor = await this.userRepository.getById(invitation.userId);

      return invitor;
    }

    return null;
  }

  async acceptInvitation(userId: number, roomId: number) {
    const invitation = await this.invitationRepository.getOneByPk(userId, roomId);
    await this.userRoomNewMessagesCountRepository.addOne({
      userId,
      roomId,
      count: 0,
    });
    let user = await this.userRepository.getById(userId);
    let room = await this.roomRepository.getOneById(roomId);

    await this.userToRoomParticipationRepository.addOne({ userId, roomId });

    await this.invitationRepository.deleteOne(userId, roomId);

    user = await this.userRepository.updateOneById(userId, {
      invitationsCount: user.invitationsCount - 1,
    });

    room = await this.roomRepository.updateOneById(roomId, {
      participantsCount: room.participantsCount + 1,
      pendingInvitationsCount: room.pendingInvitationsCount - 1,
    });

    await this.scheduledMessagesCountRepository.addOne({
      userId,
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

  async rejectInvitation(userId: number, roomId: number) {
    const invitation = await this.invitationRepository.getOneByPk(userId, roomId);
    let user = await this.userRepository.getById(userId);
    let room = await this.roomRepository.getOneById(roomId);

    await this.invitationRepository.deleteOne(userId, roomId);

    user = await this.userRepository.updateOneById(userId, {
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
