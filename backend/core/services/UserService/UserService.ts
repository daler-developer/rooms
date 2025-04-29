import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import pubsub from "../../../infrastructure/pubsub";
import redisClient from "../../../infrastructure/db/redisClient";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import { RoomRepository } from "../../repositories/RoomRepository/RoomRepository";
import { RoomNotFound } from "../../errors/rooms";

const sleep = () => new Promise((res) => setTimeout(res, 500));

@injectable()
class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.RoomRepository) private roomRepository: RoomRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
  ) {}

  async editEmail({ currentUserId, newEmail }: { currentUserId: number; newEmail: string }) {
    const updatedUser = await this.userRepository.updateOneById(currentUserId, {
      email: newEmail,
    });

    pubsub.publish("USER_PROFILE_UPDATED", updatedUser);

    return updatedUser;
  }

  async editFirstName({ currentUserId, newFirstName }: { currentUserId: number; newFirstName: string }) {
    const updatedUser = await this.userRepository.updateOneById(currentUserId, {
      firstName: newFirstName,
    });

    pubsub.publish("USER_PROFILE_UPDATED", updatedUser);

    return updatedUser;
  }

  async editLastName({ currentUserId, newLastName }: { currentUserId: number; newLastName: string }) {
    const updatedUser = await this.userRepository.updateOneById(currentUserId, {
      lastName: newLastName,
    });

    pubsub.publish("USER_PROFILE_UPDATED", updatedUser);

    return updatedUser;
  }

  async editProfilePicture({ currentUserId, newProfilePictureUrl }: { currentUserId: number; newProfilePictureUrl: string | null }) {
    const updatedUser = await this.userRepository.updateOneById(currentUserId, { profilePictureUrl: newProfilePictureUrl });

    pubsub.publish("USER_PROFILE_UPDATED", updatedUser);

    return updatedUser;
  }

  async getUserById(id: number) {
    return await this.userRepository.getOneById(id);
  }

  async fetchUserById(id: number) {
    return await this.userRepository.getOneById(id);
  }

  async resetPassword({ currentUserId, newPassword }: { currentUserId: number; newPassword: string }) {
    return await this.userRepository.updateOneById(currentUserId, {
      password: newPassword,
    });
  }

  async getUserPasswordLength(userId: number) {
    const user = await this.userRepository.getOneById(userId);

    return user.password.length;
  }

  async fetchUsers({ offset, limit, excludeIds, q }: { offset: number; limit: number; excludeIds: number[]; q: string }) {
    const users = await this.userRepository.getMany({ offset, limit, excludeIds, q });
    const moreUsers = await this.userRepository.getMany({ offset: offset + limit, limit: 1, excludeIds, q });

    return {
      data: users,
      hasMore: moreUsers.length > 0,
    };
  }

  async fetchUserIsOnlineStatus(userId: number) {
    const activeSessions = await redisClient.sMembers(`user:${String(userId)}:active_sessions`);

    return activeSessions.length > 0;
  }

  async handleUserConnect({ userId, sessionId }: { userId: number; sessionId: string }) {
    await redisClient.sAdd(`user:${String(userId)}:active_sessions`, sessionId);

    const user = await this.userRepository.getOneById(userId);

    pubsub.publish("USER_ONLINE_STATUS_CHANGE", {
      usersOnlineStatusChange: user,
    });

    const participations = await this.userToRoomParticipationRepository.getManyByUserId(userId);
    const roomIds = participations.map((p) => p.roomId);

    for (const roomId of roomIds) {
      pubsub.publish("ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE", {
        roomId,
      });
    }

    // if (isOnline) {
    //   await redisClient.sAdd(`user:${String(userId)}:active_sessions`, sessionId);
    //
    //   const user = await this.userRepository.getById(userId);
    //
    //   pubsub.publish("USER_ONLINE_STATUS_CHANGE", {
    //     usersOnlineStatusChange: user,
    //   });
    //
    //   return await this.userRepository.getById(userId);
    // } else {
    //   await redisClient.sRem(`user:${String(userId)}:active_sessions`, sessionId);
    //
    //   const user = await this.userRepository.getById(userId);
    //
    //   pubsub.publish("USER_ONLINE_STATUS_CHANGE", {
    //     usersOnlineStatusChange: user,
    //   });
    //
    //   return await this.userRepository.getById(userId);
    // }
  }

  async handleUserDisconnect({ userId, sessionId }: { userId: number; sessionId: string }) {}

  async fetchRoomParticipants(roomId: number) {
    const participations = await this.userToRoomParticipationRepository.getManyByRoomId(roomId);
    const userIds = participations.map((p) => p.userId);

    return await this.userRepository.getManyByIds(userIds);
  }

  async notifyUserTypingStatusChange({
    currentUserId,
    sessionId,
    isTyping,
    roomId,
  }: {
    currentUserId: number;
    sessionId: string;
    isTyping: boolean;
    roomId: number;
  }) {
    const user = await this.userRepository.getOneById(currentUserId);

    if (isTyping) {
      await redisClient.sAdd(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`, sessionId);
    }

    if (!isTyping) {
      await redisClient.sRem(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`, sessionId);
    }

    const sessionIds = await redisClient.sMembers(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`);

    if (sessionIds.length === 0) {
      pubsub.publish("USER_TYPING_STATUS_CHANGE", {
        userTypingStatusChange: {
          isTyping: false,
          user,
          roomId,
        },
      });
    } else {
      pubsub.publish("USER_TYPING_STATUS_CHANGE", {
        userTypingStatusChange: {
          isTyping: true,
          user,
          roomId,
        },
      });
    }
  }

  async notifyTypingStart({ roomId, currentUserId, sessionId }: { roomId: number; sessionId: string; currentUserId: number }) {
    const room = await this.roomRepository.getOneById(roomId);
    if (!room) {
      throw new RoomNotFound();
    }

    const sessionsCount = await redisClient.sCard(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`);

    if (sessionsCount === 0) {
      pubsub.publish("USER_TYPING_START", {
        userId: currentUserId,
        roomId,
      });
    }

    await redisClient.sAdd(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`, sessionId);
  }

  async notifyTypingStop({ roomId, sessionId, currentUserId }: { roomId: number; sessionId: string; currentUserId: number }) {
    const room = await this.roomRepository.getOneById(roomId);
    if (!room) {
      throw new RoomNotFound();
    }

    await redisClient.sRem(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`, sessionId);

    const sessionsCount = await redisClient.sCard(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`);

    if (sessionsCount === 0) {
      pubsub.publish("USER_TYPING_STOP", {
        userId: currentUserId,
        roomId,
      });
    }
  }
}

export default UserService;
