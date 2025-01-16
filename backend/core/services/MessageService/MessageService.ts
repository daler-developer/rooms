import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { MessageRepository } from "../../repositories/MessageRepository/MessageRepository";
import { CreateMessageDto } from "../../repositories/MessageRepository/dto/CreateMessageDto";
import pubsub from "../../../infrastructure/pubsub";
import { MessageImageRepository } from "../../repositories/MessageImageRepository/MessageImageRepository";
import { MessageViewRepository } from "../../repositories/MessageViewRepository/MessageViewRepository";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { RoomRepository } from "../../repositories/RoomRepository/RoomRepository";
import message from "../../../infrastructure/resolvers/Query/message";
import { log } from "node:util";
import { ScheduledMessagesCountRepository } from "../../repositories/ScheduledMessagesCountRepository/ScheduledMessagesCountRepository";
import { Message } from "../../entities/Message";
import redisClient from "../../../infrastructure/db/redisClient";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";

@injectable()
export class MessageService {
  constructor(
    @inject(TYPES.MessageRepository) private messageRepository: MessageRepository,
    @inject(TYPES.RoomRepository) private roomRepository: RoomRepository,
    @inject(TYPES.MessageImageRepository) private messageImageRepository: MessageImageRepository,
    @inject(TYPES.MessageViewRepository) private messageViewRepository: MessageViewRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.ScheduledMessagesCountRepository) private scheduledMessagesCountRepository: ScheduledMessagesCountRepository,
    @inject(TYPES.UserToRoomParticipationRepository) private userToRoomParticipationRepository: UserToRoomParticipationRepository,
  ) {}

  async fetchMessagesByRoomId(roomId: number, { offset }: { offset: number }) {
    const data = await this.messageRepository.getManyByRoomId(roomId, { offset, isSent: true });

    const room = await this.roomRepository.getOneById(roomId);

    const hasMore = offset + data.length < room.messagesCount;

    return {
      data,
      hasMore,
    };
  }

  async fetchScheduledMessages(roomId: number, { offset }: { offset: number }) {
    const data = await this.messageRepository.getManyByRoomId(roomId, { offset, isSent: false });

    const hasMore = true;

    return {
      data,
      hasMore,
    };
  }

  async sendMessage({ text, senderId, roomId, imageUrls }: Pick<CreateMessageDto, "text" | "senderId" | "roomId" | "imageUrls">) {
    const message = await this.messageRepository.addOne(
      new CreateMessageDto({
        senderId,
        roomId,
        text,
        imageUrls,
        sentAt: new Date(),
      }),
    );

    const participantsIds = (await this.userToRoomParticipationRepository.getManyByRoomId(roomId)).map((p) => p.userId);

    for (const participantsId of participantsIds) {
      const isSender = senderId === participantsId;

      if (!isSender) {
        await redisClient.hIncrBy(`rooms:${roomId}:unread_messages`, String(participantsId), 1);
      }
    }

    const room = await this.roomRepository.getOneById(roomId);

    pubsub.publish("NEW_MESSAGE", {
      newMessage: {
        message,
        room,
      },
    });

    await this.roomRepository.updateOneById(room.id, {
      messagesCount: room.messagesCount + 1,
    });

    for (const imageUrl of imageUrls) {
      await this.messageImageRepository.addOne({ url: imageUrl, messageId: message.id });
    }

    return message;
  }

  async scheduleMessage({
    text,
    senderId,
    roomId,
    imageUrls,
    scheduleAt,
  }: Pick<CreateMessageDto, "text" | "senderId" | "roomId" | "imageUrls" | "scheduleAt">) {
    const message = await this.messageRepository.addOne(
      new CreateMessageDto({
        senderId,
        roomId,
        text,
        imageUrls,
        sentAt: null,
        scheduleAt,
      }),
    );

    pubsub.publish("NEW_MESSAGE", {
      newMessage: {
        message,
      },
    });

    const { count } = await this.scheduledMessagesCountRepository.getOneByPk({ roomId, userId: senderId });

    await this.scheduledMessagesCountRepository.updateOneByPk(
      { userId: senderId, roomId },
      {
        count: count + 1,
      },
    );

    const room = await this.roomRepository.getOneById(roomId);

    await this.roomRepository.updateOneById(room.id, {
      messagesCount: room.messagesCount + 1,
    });

    for (const imageUrl of imageUrls) {
      await this.messageImageRepository.addOne({ url: imageUrl, messageId: message.id });
    }

    const targetTime = new Date(scheduleAt).getTime();
    const currentTime = Date.now();
    const delay = targetTime - currentTime;

    // setTimeout(async () => {
    //   await this.messageRepository.updateOneById(message.id, { sentAt: message.scheduleAt, scheduleAt: null });
    // }, delay);

    return message;
  }

  async markMessageAsViewsByUser(messageId: number, userId: number) {
    let message = await this.messageRepository.getOneById(messageId);

    await redisClient.hIncrBy(`rooms:${message.roomId}:unread_messages`, String(userId), -1);

    if (Boolean(await this.messageViewRepository.getOneByPk({ messageId, userId }))) {
      return await this.messageRepository.getOneById(messageId);
    }

    const user = await this.userRepository.getById(userId);
    await this.messageRepository.incrementViewsCount(messageId);

    await this.messageViewRepository.addOne({
      userId,
      messageId,
    });

    message = await this.messageRepository.getOneById(messageId);

    pubsub.publish("MESSAGE_VIEWED", {
      messageViewed: {
        viewer: user,
        message,
      },
    });

    return message;
  }

  async isMessageViewedByUser(messageId: number, userId: number) {
    const messageView = await this.messageViewRepository.getOneByPk({ messageId, userId });

    return Boolean(messageView);
  }

  async fetchMessageViewers(messageId: number) {
    const messageViews = await this.messageViewRepository.getManyByMessageId(messageId);

    const userIds = messageViews.map((messageView) => messageView.userId);

    if (!userIds.length) {
      return [];
    }

    return this.userRepository.getManyByIds(userIds);
  }

  async fetchMessageById(messageId: number) {
    return this.messageRepository.getOneById(messageId);
  }

  async deleteMessages(roomId: number, messageIds: number[]) {
    pubsub.publish("MESSAGES_DELETED", {
      roomId,
      messageIds,
    });

    const room = await this.roomRepository.getOneById(roomId);

    await this.messageRepository.deleteManyByIds(messageIds);

    await this.roomRepository.updateOneById(roomId, {
      messagesCount: room.messagesCount - messageIds.length,
    });
  }

  async fetchScheduledMessagesCount({ roomId, userId }: { roomId: number; userId: number }) {
    return 0;
    const { count } = await this.scheduledMessagesCountRepository.getOneByPk({ roomId, userId });

    return count;
  }

  async fetchRoomLastMessage(roomId: number): Promise<Message | null> {
    const [message] = await this.messageRepository.getManyByRoomId(roomId, { offset: 0, limit: 1, isSent: true });

    return message;
  }
}
