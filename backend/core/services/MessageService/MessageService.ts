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
import { ScheduledMessagesCountRepository } from "../../repositories/ScheduledMessagesCountRepository/ScheduledMessagesCountRepository";
import { Message } from "../../entities/Message";
import redisClient from "../../../infrastructure/db/redisClient";
import { UserToRoomParticipationRepository } from "../../repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import { InvitationRepository } from "../../repositories/InvitationRepository/InvitationRepository";
import { UserRoomNewMessagesCountRepository } from "../../repositories/UserRoomNewMessagesCountRepository/UserRoomNewMessagesCountRepository";

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
    @inject(TYPES.InvitationRepository) private invitationRepository: InvitationRepository,
    @inject(TYPES.UserRoomNewMessagesCountRepository) private userRoomNewMessagesCountRepository: UserRoomNewMessagesCountRepository,
  ) {}

  async fetchInvitedUsers(roomId: number) {
    const invitations = await this.invitationRepository.getManyByRoomId(roomId);
    const ids = invitations.map((i) => i.userId);
    const users = await this.userRepository.getManyByIds(ids);
    return users;
  }

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

  async sendMessage({ text, senderId, roomId, imageUrls, sessionId }: Pick<CreateMessageDto, "text" | "senderId" | "roomId" | "imageUrls" | "sessionId">) {
    const message = await this.messageRepository.addOne(
      new CreateMessageDto({
        senderId,
        roomId,
        text,
        imageUrls,
        sentAt: new Date().toISOString(),
        sessionId,
      }),
    );

    const participantsIds = (await this.userToRoomParticipationRepository.getManyByRoomId(roomId)).map((p) => p.userId);

    for (const participantsId of participantsIds) {
      const isSender = senderId === participantsId;

      if (!isSender) {
        let userRoomNewMessagesCount = await this.userRoomNewMessagesCountRepository.getOneByPk({ userId: participantsId, roomId });
        userRoomNewMessagesCount = await this.userRoomNewMessagesCountRepository.updateOneByPk(
          { userId: participantsId, roomId },
          {
            count: userRoomNewMessagesCount.count + 1,
          },
        );
        pubsub.publish("ROOM_NEW_MESSAGES_COUNT_CHANGE", {
          roomId,
          userId: participantsId,
          count: userRoomNewMessagesCount.count,
        });
      }
    }

    const room = await this.roomRepository.getOneById(roomId);

    pubsub.publish("NEW_MESSAGE", message);
    pubsub.publish("ROOM_LAST_MESSAGE_CHANGE", {
      roomId: room.id,
      message,
    });

    await this.roomRepository.updateOneById(room.id, {
      messagesCount: room.messagesCount + 1,
    });

    for (const imageUrl of imageUrls) {
      await this.messageImageRepository.addOne({ url: imageUrl, messageId: message.id });
    }

    return message;
  }

  async sendSavedMessageAtScheduledAt(messageId: number) {
    let message = await this.messageRepository.getOneById(messageId);

    const targetTime = new Date(message.scheduledAt).getTime();
    const currentTime = Date.now();
    const delay = targetTime - currentTime;

    setTimeout(async () => {
      message = await this.messageRepository.getOneById(message.id);

      if (message.isDeleted) {
        return;
      }

      message = await this.messageRepository.updateOneById(message.id, { sentAt: new Date().toISOString() });

      pubsub.publish("ROOM_LAST_MESSAGE_CHANGE", {
        roomId: message.roomId,
        message,
      });
      pubsub.publish("NEW_MESSAGE", message);
      pubsub.publish("SCHEDULED_MESSAGES_DELETED", {
        roomId: message.roomId,
        messageIds: [message.id],
      });

      const count = await this.scheduledMessagesCountRepository.getOneByPk({ userId: message.senderId, roomId: message.roomId });
      const updatedCount = count.count - 1;

      pubsub.publish("ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE", {
        roomId: message.roomId,
        userId: message.senderId,
        count: updatedCount,
      });

      await this.scheduledMessagesCountRepository.updateOneByPk(
        { userId: message.senderId, roomId: message.roomId },
        {
          count: updatedCount,
        },
      );
    }, delay);
  }

  async sendScheduledMessagesAtScheduledAt() {
    const messages = await this.messageRepository.getMany({ isSent: false });

    for (const message of messages) {
      this.sendSavedMessageAtScheduledAt(message.id);
    }
  }

  async scheduleMessage({
    text,
    senderId,
    roomId,
    imageUrls,
    scheduleAt,
    sessionId,
  }: Pick<CreateMessageDto, "text" | "senderId" | "roomId" | "imageUrls" | "scheduleAt" | "sessionId">) {
    let message = await this.messageRepository.addOne(
      new CreateMessageDto({
        senderId,
        roomId,
        text,
        imageUrls,
        sentAt: null,
        scheduleAt,
        sessionId,
      }),
    );
    const scheduledMessagesCount = await this.scheduledMessagesCountRepository.getOneByPk({ userId: senderId, roomId });

    pubsub.publish("ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE", {
      roomId,
      userId: senderId,
      count: scheduledMessagesCount.count + 1,
    });
    pubsub.publish("NEW_SCHEDULED_MESSAGE", message);

    await this.scheduledMessagesCountRepository.updateOneByPk(
      { userId: senderId, roomId },
      {
        count: scheduledMessagesCount.count + 1,
      },
    );

    for (const imageUrl of imageUrls) {
      await this.messageImageRepository.addOne({ url: imageUrl, messageId: message.id });
    }

    // await this.sendSavedMessageAtScheduledAt(message.id);

    return message;
  }

  async sendScheduledMessagesNow({ userId, messageIds }: { messageIds: number[]; userId: number }) {
    for (const messageId of messageIds) {
      await this.messageRepository.updateOneById(messageId, { sentAt: new Date().toISOString() });
    }
    const allMessages = await this.messageRepository.getManyByIds(messageIds);
    const grouped = allMessages.reduce<Record<number, Message[]>>((accum, message) => {
      if (!accum[message.roomId]) {
        accum[message.roomId] = [];
      }
      accum[message.roomId].push(message);
      return accum;
    }, {});
    for (let entry of Object.entries(grouped)) {
      const roomId = Number(entry[0]);
      const messages = entry[1];
      const messagesCount = messages.length;
      let scheduledMessagesCount = await this.scheduledMessagesCountRepository.getOneByPk({ roomId, userId });
      pubsub.publish("ROOM_LAST_MESSAGE_CHANGE", {
        roomId,
        message: messages.at(-1),
      });
      pubsub.publish("ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE", {
        roomId,
        userId,
        count: scheduledMessagesCount.count - messagesCount,
      });
      pubsub.publish("SCHEDULED_MESSAGES_DELETED", {
        userId,
        roomId,
        messageIds: messages.map((message) => message.id),
      });
      for (const message of messages) {
        pubsub.publish("NEW_MESSAGE", message);
      }
      const room = await this.roomRepository.getOneById(roomId);
      await this.roomRepository.updateOneById(roomId, {
        messagesCount: room.messagesCount + messages.length,
      });
      await this.scheduledMessagesCountRepository.updateOneByPk(
        { roomId, userId },
        {
          count: scheduledMessagesCount.count - messagesCount,
        },
      );
    }
  }

  async markMessageAsViewed({ messageId, userId }: { messageId: number; userId: number }) {
    let message = await this.messageRepository.getOneById(messageId);

    await redisClient.hIncrBy(`rooms:${message.roomId}:unread_messages`, String(userId), -1);

    if (Boolean(await this.messageViewRepository.getOneByPk({ messageId, userId }))) {
      return await this.messageRepository.getOneById(messageId);
    }

    await this.messageRepository.updateOneById(messageId, {
      viewsCount: message.viewsCount + 1,
    });

    let newMessagesCount = await this.userRoomNewMessagesCountRepository.getOneByPk({ userId, roomId: message.roomId });
    newMessagesCount = await this.userRoomNewMessagesCountRepository.updateOneByPk(
      { userId, roomId: message.roomId },
      {
        count: newMessagesCount.count - 1,
      },
    );

    pubsub.publish("ROOM_NEW_MESSAGES_COUNT_CHANGE", {
      roomId: message.roomId,
      userId,
      count: newMessagesCount.count,
    });

    await this.messageViewRepository.addOne({
      userId,
      messageId,
    });

    message = await this.messageRepository.getOneById(messageId);

    pubsub.publish("MESSAGE_VIEWS_COUNT_CHANGE", {
      messageId,
      count: message.viewsCount,
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

  async deleteMessages(messageIds: number[]) {
    const messages = await this.messageRepository.getManyByIds(messageIds);
    type RoomId = number;
    const grouped = messages.reduce<Map<RoomId, Message[]>>((accum, message) => {
      if (!accum.has(message.roomId)) {
        accum.set(message.roomId, []);
      }
      accum.get(message.roomId).push(message);
      return accum;
    }, new Map());
    for (let [roomId, messages] of grouped.entries()) {
      const messageIds = messages.map((message) => message.id);
      pubsub.publish("MESSAGES_DELETED", {
        roomId,
        messageIds,
      });
      const room = await this.roomRepository.getOneById(roomId);
      await this.roomRepository.updateOneById(roomId, {
        messagesCount: room.messagesCount - messageIds.length,
      });
      for (const messageId of messageIds) {
        await this.messageRepository.updateOneById(messageId, {
          isDeleted: true,
        });
      }
      const newLastMessage = await this.fetchRoomLastMessage(roomId);
      pubsub.publish("ROOM_LAST_MESSAGE_CHANGE", {
        roomId,
        message: newLastMessage,
      });
    }
  }

  async deleteScheduledMessages({ messageIds, userId }: { messageIds: number[]; userId: number }) {
    const messages = await this.messageRepository.getManyByIds(messageIds);
    const grouped = messages.reduce<Record<number, Message[]>>((accum, message) => {
      if (!accum[message.roomId]) {
        accum[message.roomId] = [];
      }
      accum[message.roomId].push(message);
      return accum;
    }, {});
    for (let [roomId, messages] of Object.entries(grouped)) {
      const messageIds = messages.map((message) => message.id);
      pubsub.publish("SCHEDULED_MESSAGES_DELETED", {
        userId,
        roomId: Number(roomId),
        messageIds,
      });
      const room = await this.roomRepository.getOneById(Number(roomId));
      await this.roomRepository.updateOneById(Number(roomId), {
        messagesCount: room.messagesCount - messageIds.length,
      });
      for (const messageId of messageIds) {
        await this.messageRepository.updateOneById(messageId, {
          isDeleted: true,
        });
      }
    }
  }

  async fetchScheduledMessagesCount({ roomId, userId }: { roomId: number; userId: number }) {
    const scheduledMessagesCount = await this.scheduledMessagesCountRepository.getOneByPk({ userId, roomId });

    return scheduledMessagesCount.count;
  }

  async fetchRoomLastMessage(roomId: number): Promise<Message | null> {
    const [message] = await this.messageRepository.getManyByRoomId(roomId, { offset: 0, limit: 1, isSent: true });

    return message;
  }
}
