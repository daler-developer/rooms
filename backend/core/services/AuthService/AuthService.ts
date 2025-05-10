import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { TYPES } from "../../../types";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { IncorrectPasswordError } from "../../errors/auth";
import { UserNotFound } from "../../errors/users";
import { UserWithEmailAlreadyExists } from "../../errors/auth";
import { AddUserDto } from "../../repositories/UserRepository/dto/AddUserDto";
import redisClient from "../../../infrastructure/db/redisClient";
import pubsub from "../../../infrastructure/pubsub";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import { RoomService } from "../RoomService/RoomService";

@injectable()
class AuthService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
    @inject(TYPES.RoomService) private roomService: RoomService,
  ) {}

  async checkEmailAvailabilityForRegistration(email: string) {
    const user = await this.userRepository.getOneByEmail(email);

    return !Boolean(user);
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.getOneByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    if (user.password !== password) {
      throw new IncorrectPasswordError();
    }

    const token = jwt.sign({ userId: user.id }, "jwt-secret", { expiresIn: "2 days" });

    return {
      user,
      token,
    };
  }

  async register(addUserDto: AddUserDto) {
    const exists = Boolean(await this.userRepository.getOneByEmail(addUserDto.email));

    if (exists) {
      throw new UserWithEmailAlreadyExists();
    }

    const user = await this.userRepository.addOne(addUserDto);

    const token = jwt.sign({ userId: user.id }, "jwt-secret", { expiresIn: "2 days" });

    return {
      user,
      token,
    };
  }

  async startSession() {
    const sessionToken = jwt.sign({ sessionId: uuidv4() }, "jwt-secret", { expiresIn: "10 days" });

    return {
      sessionToken,
    };
  }

  async handleUserConnect({ userId, sessionId }: { userId: number; sessionId: string }) {
    await redisClient.sAdd(`user:${String(userId)}:active_sessions`, sessionId);

    const user = await this.userRepository.getOneById(userId);

    pubsub.publish("USER_ONLINE_STATUS_CHANGE", user);

    const participations = await this.userToRoomParticipationRepository.getManyByUserId(userId);
    const roomIds = participations.map((p) => p.roomId);

    for (const roomId of roomIds) {
      const updatedOnlineCount = await this.roomService.fetchUsersOnlineCountInRoom(roomId);

      pubsub.publish("ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE", {
        roomId,
        count: updatedOnlineCount,
      });
    }
  }

  async handleUserDisconnect({ currentUserId, sessionId }: { currentUserId: number; sessionId: string }) {
    await redisClient.sRem(`user:${String(currentUserId)}:active_sessions`, sessionId);

    const user = await this.userRepository.getOneById(currentUserId);

    pubsub.publish("USER_ONLINE_STATUS_CHANGE", user);

    const roomParticipations = await this.userToRoomParticipationRepository.getManyByUserId(currentUserId);
    const roomIds = roomParticipations.map((p) => p.roomId);

    for (const roomId of roomIds) {
      await redisClient.sRem(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`, sessionId);
      const sessionsCount = await redisClient.sCard(`rooms:${roomId}:participants:${currentUserId}:currently_typing_session_ids`);

      if (sessionsCount === 0) {
        pubsub.publish("USER_TYPING_STOP", {
          userId: currentUserId,
          roomId,
        });
      }
    }

    for (const roomId of roomIds) {
      pubsub.publish("ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE", {
        roomId,
        count: await this.roomService.fetchUsersOnlineCountInRoom(roomId),
      });
    }
  }

  decodeSessionToken(sessionToken: string) {
    return jwt.verify(sessionToken, "jwt-secret");
  }

  decodeAuthToken(token: string) {
    return jwt.verify(token, "jwt-secret");
  }
}

export default AuthService;
