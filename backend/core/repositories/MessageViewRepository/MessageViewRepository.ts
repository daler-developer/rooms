import { CreateMessageViewDto } from "./dto/CreateMessageViewDto";
import { MessageView } from "../../entities/MessageView";

export interface MessageViewRepository {
  addOne(dto: CreateMessageViewDto): Promise<void>;
  getOneByPk(pk: { userId: number; messageId: number }): Promise<MessageView | null>;
  getManyByMessageId(messageId: number): Promise<MessageView[]>;
}
