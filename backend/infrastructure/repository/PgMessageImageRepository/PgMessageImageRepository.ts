import { injectable } from "inversify";
import { MessageImageRepository } from "../../../core/repositories/MessageImageRepository/MessageImageRepository";
import { MessageImage } from "../../../core/entities/MessageImage";
import { CreateMessageDto } from "../../../core/repositories/MessageRepository/dto/CreateMessageDto";
import db from "../../db";
import { messages } from "../../entities/Message";
import { eq, desc } from "drizzle-orm";
import { CreateMessageImageDto } from "../../../core/repositories/MessageImageRepository/dto/CreateMessageImageDto";
import { messageImages } from "../../entities/MessageImage";

@injectable()
export class PgMessageImageRepository implements MessageImageRepository {
  async addOne(dto: CreateMessageImageDto): Promise<MessageImage> {
    const [messageImage] = await db
      .insert(messageImages)
      .values({
        url: dto.url,
        messageId: dto.messageId,
      })
      .returning();

    return messageImage;
  }

  async getManyByMessageId(messageId: number): Promise<MessageImage[]> {
    const result = await db.select().from(messageImages).where(eq(messageImages.messageId, messageId));

    return result;
  }
}
