import { MessageImage } from "../../entities/MessageImage";
import { CreateMessageImageDto } from "./dto/CreateMessageImageDto";

export interface MessageImageRepository {
  addOne(dto: CreateMessageImageDto): Promise<MessageImage>;
  getManyByMessageId(messageId: number): Promise<MessageImage[]>;
}
