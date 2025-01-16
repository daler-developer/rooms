import { Message } from "../../entities/Message";
import { CreateMessageDto } from "./dto/CreateMessageDto";

export interface MessageRepository {
  getOneById(id: number): Promise<Message> | null;
  addOne(dto: CreateMessageDto): Promise<Message>;
  getManyByRoomId(roomId: number, options: { offset: number; isSent: boolean; limit?: number }): Promise<Message[]>;
  incrementViewsCount(messageId: number): Promise<void>;
  deleteManyByIds(messageIds: number[]): Promise<void>;
  updateOneById(messageId: number, data: Partial<Pick<Message, "text" | "scheduledAt" | "createdAt" | "sentAt" | "isDeleted">>): Promise<Message>;
}
