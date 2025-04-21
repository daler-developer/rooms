import { Message } from "../../entities/Message";
import { CreateMessageDto } from "./dto/CreateMessageDto";

export interface MessageRepository {
  getOneById(id: number): Promise<Message> | null;
  addOne(dto: CreateMessageDto): Promise<Message>;
  getMany({ isSent }: { isSent: boolean }): Promise<Message[]>;
  getManyByIds(ids: number[]): Promise<Message[]>;
  getManyByRoomId(roomId: number, options: { offset: number; isSent: boolean; limit?: number }): Promise<Message[]>;
  deleteManyByIds(messageIds: number[]): Promise<void>;
  updateOneById(
    messageId: number,
    data: Partial<Pick<Message, "text" | "scheduledAt" | "createdAt" | "sentAt" | "isDeleted" | "viewsCount">>,
  ): Promise<Message>;
}
