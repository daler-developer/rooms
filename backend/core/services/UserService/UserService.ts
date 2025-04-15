import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import db from "../../../infrastructure/db";
import { usersToRoomsInvite } from "../../../infrastructure/entities/UsersToRoomsInvite";
import { eq } from "drizzle-orm";
import pubsub from "../../../infrastructure/pubsub";
import usersOnlineStatusChange from "../../../infrastructure/resolvers/Subscription/usersOnlineStatusChange";
import redisClient from "../../../infrastructure/db/redisClient";
import { UserToRoomRepository } from "../../repositories/UserToRoomRepository/UserToRoomRepository";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import { AddUserDto } from "../../repositories/UserRepository/dto/AddUserDto";
import { IncorrectPasswordGraphQLError, MeIsBlockedGraphQLError, UserNotFoundGraphQLError } from "../../../infrastructure/lib/graphql/errors";
import { RoomRepository } from "../../repositories/RoomRepository/RoomRepository";

const sleep = () => new Promise((res) => setTimeout(res, 500));

@injectable()
class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.RoomRepository) private roomRepository: RoomRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
  ) {}

  async userEditEmail({ userId, newEmail }: { userId: number; newEmail: string }) {
    return await this.userRepository.updateOneById(userId, {
      email: newEmail,
    });
  }

  async editFirstName({ userId, newFirstName }: { userId: number; newFirstName: string }) {
    const updatedUser = await this.userRepository.updateOneById(userId, {
      firstName: newFirstName,
    });

    pubsub.publish("USER_PROFILE_UPDATED", updatedUser);

    return updatedUser;
  }

  async editLastName({ userId, newLastName }: { userId: number; newLastName: string }) {
    const updatedUser = await this.userRepository.updateOneById(userId, {
      lastName: newLastName,
    });

    pubsub.publish("USER_PROFILE_UPDATED", updatedUser);

    return updatedUser;
  }

  async editProfilePicture({ userId, newProfilePictureUrl }: { userId: number; newProfilePictureUrl: string | null }) {
    const updatedUser = await this.userRepository.updateOneById(userId, { profilePictureUrl: newProfilePictureUrl });

    pubsub.publish("USER_PROFILE_UPDATED", updatedUser);

    return updatedUser;
  }

  async getUserById(id: number) {
    return await this.userRepository.getById(id);
  }

  async fetchUserById(id: number) {
    return await this.userRepository.getById(id);
  }

  async blockUser(userId: number) {
    await this.userRepository.setIsBlocked(userId, true);

    return await this.getUserById(userId);
  }

  async unblockUser(userId: number) {
    await this.userRepository.setIsBlocked(userId, false);

    return await this.getUserById(userId);
  }

  async resetPassword({ userId, newPassword }: { userId: number; newPassword: string }) {
    await this.userRepository.updatePassword(userId, newPassword);

    return await this.getUserById(userId);
  }

  async getUserPasswordLength(userId: number) {
    const user = await this.userRepository.getById(userId);

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

    const user = await this.userRepository.getById(userId);

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

  async notifyUserTypingStatusChange({ userId, sessionId, isTyping, roomId }: { userId: number; sessionId: string; isTyping: boolean; roomId: number }) {
    const user = await this.userRepository.getById(userId);

    if (isTyping) {
      await redisClient.sAdd(`rooms:${roomId}:participants:${userId}:currently_typing_session_ids`, sessionId);
    }

    if (!isTyping) {
      await redisClient.sRem(`rooms:${roomId}:participants:${userId}:currently_typing_session_ids`, sessionId);
    }

    const sessionIds = await redisClient.sMembers(`rooms:${roomId}:participants:${userId}:currently_typing_session_ids`);

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

  async notifyTypingStart({ roomId, userId, sessionId }: { roomId: number; sessionId: string; userId: number }) {
    const sessionsCount = await redisClient.sCard(`rooms:${roomId}:participants:${userId}:currently_typing_session_ids`);

    if (sessionsCount === 0) {
      pubsub.publish("USER_TYPING_START", {
        userId,
        roomId,
      });
    }

    await redisClient.sAdd(`rooms:${roomId}:participants:${userId}:currently_typing_session_ids`, sessionId);
  }

  async notifyTypingStop({ roomId, sessionId, userId }: { roomId: number; sessionId: string; userId: number }) {
    await redisClient.sRem(`rooms:${roomId}:participants:${userId}:currently_typing_session_ids`, sessionId);

    const sessionsCount = await redisClient.sCard(`rooms:${roomId}:participants:${userId}:currently_typing_session_ids`);

    if (sessionsCount === 0) {
      pubsub.publish("USER_TYPING_STOP", {
        userId,
        roomId,
      });
    }
  }
}

export default UserService;
