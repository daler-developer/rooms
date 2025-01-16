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

const sleep = () => new Promise((res) => setTimeout(res, 500));

@injectable()
class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
  ) {}

  async userEditEmail({ userId, newEmail }: { userId: number; newEmail: string }) {
    return await this.userRepository.updateOneById(userId, {
      email: newEmail,
    });
  }

  async userEditFirstName({ userId, newFirstName }: { userId: number; newFirstName: string }) {
    return await this.userRepository.updateOneById(userId, {
      firstName: newFirstName,
    });
  }

  async userEditLastName({ userId, newLastName }: { userId: number; newLastName: string }) {
    return await this.userRepository.updateOneById(userId, {
      lastName: newLastName,
    });
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

  async removeUserAvatar(userId: number) {
    await this.userRepository.removeAvatar(userId);

    return await this.getUserById(userId);
  }

  async editUserPassword(userId: number, newPassword: string) {
    await this.userRepository.updatePassword(userId, newPassword);

    return await this.getUserById(userId);
  }

  async getUserPasswordLength(userId: number) {
    const user = await this.userRepository.getById(userId);

    return user.password.length;
  }

  async fetchUsers({ offset, limit, excludeIds, q }: { offset: number; limit: number; excludeIds: number[]; q: string }) {
    return this.userRepository.getMany({ offset, limit, excludeIds, q });
  }

  async fetchUsersCount({ offset, excludeIds, q }: { offset: number; excludeIds: number[]; q: string }) {
    return this.userRepository.getManyCount({ offset, excludeIds, q });
  }

  async fetchUserIsOnlineStatus(userId: number) {
    return (await redisClient.get(`user:${String(userId)}:is_online`)) === "true";
  }

  async updateUserOnlineStatus(userId: number, { isOnline }: { isOnline: boolean }) {
    await redisClient.set(`user:${String(userId)}:is_online`, isOnline ? "true" : "false");

    const user = await this.userRepository.getById(userId);

    pubsub.publish("USER_ONLINE_STATUS_CHANGE", {
      usersOnlineStatusChange: user,
    });

    return await this.userRepository.getById(userId);
  }

  async fetchRoomParticipants(roomId: number) {
    const userIds = (await this.userToRoomParticipationRepository.getManyByRoomId(roomId)).map((p) => p.userId);

    return await this.userRepository.getManyByIds(userIds);
  }

  async notifyUserTypingStatusChange({ userId, isTyping, roomId }: { userId: number; isTyping: boolean; roomId: number }) {
    const user = await this.userRepository.getById(userId);

    pubsub.publish("USER_TYPING_STATUS_CHANGE", {
      userTypingStatusChange: {
        isTyping,
        user,
        roomId,
      },
    });

    if (isTyping) {
      await redisClient.sAdd(`rooms:${roomId}:users_typing_ids`, String(userId));
    }

    if (!isTyping) {
      await redisClient.sRem(`rooms:${roomId}:users_typing_ids`, String(userId));
    }
  }

  async updateUserProfilePicture(userId: number, newProfilePictureUrl: string) {
    await this.userRepository.updateOneById(userId, { profilePictureUrl: newProfilePictureUrl });

    return await this.getUserById(userId);
  }

  async userUpdateFirstName(userId: number, newFirstName: string) {
    await this.userRepository.updateOneById(userId, {
      firstName: newFirstName,
    });

    return await this.getUserById(userId);
  }

  async userUpdateLastName(userId: number, newLastName: string) {
    await this.userRepository.updateOneById(userId, {
      lastName: newLastName,
    });

    return await this.getUserById(userId);
  }
}

export default UserService;
