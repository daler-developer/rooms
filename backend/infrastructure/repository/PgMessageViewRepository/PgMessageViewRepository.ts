import { injectable } from "inversify";
import db from "../../db";
import { messageViews } from "../../entities/MessageViews";
import { MessageViewRepository } from "../../../core/repositories/MessageViewRepository/MessageViewRepository";
import { CreateMessageViewDto } from "../../../core/repositories/MessageViewRepository/dto/CreateMessageViewDto";
import { MessageView } from "../../../core/entities/MessageView";
import { and, eq } from "drizzle-orm";
import { number } from "yup";

@injectable()
export class PgMessageViewRepository implements MessageViewRepository {
  async getOneByPk({ userId, messageId }: { userId: number; messageId: number }): Promise<MessageView | null> {
    const [messageView] = await db
      .select()
      .from(messageViews)
      .where(and(eq(messageViews.messageId, messageId), eq(messageViews.userId, userId)));

    return messageView;
  }

  async addOne(dto: CreateMessageViewDto): Promise<void> {
    await db.insert(messageViews).values({
      userId: dto.userId,
      messageId: dto.messageId,
    });
  }

  async getManyByMessageId(messageId: number): Promise<MessageView[]> {
    return db.select().from(messageViews).where(eq(messageViews.messageId, messageId));
  }
}
