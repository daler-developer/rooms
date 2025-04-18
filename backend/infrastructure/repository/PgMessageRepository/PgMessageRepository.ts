import { injectable } from "inversify";
import { MessageRepository } from "../../../core/repositories/MessageRepository/MessageRepository";
import { Message } from "../../../core/entities/Message";
import { CreateMessageDto } from "../../../core/repositories/MessageRepository/dto/CreateMessageDto";
import db from "../../db";
import { messages } from "../../entities/Message";
import { eq, desc, sql, inArray, isNotNull, ne, and, isNull } from "drizzle-orm";
import { users } from "../../entities/User";
import { number } from "yup";

@injectable()
export class PgMessageRepository implements MessageRepository {
  async getManyByRoomId(roomId: number, { offset, isSent, limit = 20 }: { offset: number; isSent: boolean; limit?: number }): Promise<Message[]> {
    let query = db.select().from(messages).offset(offset).orderBy(desc(messages.createdAt));

    const conditions = [eq(messages.roomId, roomId), eq(messages.isDeleted, false)];

    if (isSent) {
      conditions.push(isNotNull(messages.sentAt));
    } else {
      conditions.push(isNull(messages.sentAt));
    }

    // @ts-ignore
    query = query.where(and(...conditions)).limit(limit);

    return query;
  }

  async getManyByIds(ids: number[]): Promise<Message[]> {
    return db.select().from(messages).where(inArray(messages.id, ids));
  }

  async getOneById(id: number): Promise<Message> | null {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));

    return message;
  }

  async addOne(dto: CreateMessageDto): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values({
        senderId: dto.senderId,
        roomId: dto.roomId,
        text: dto.text,
        scheduledAt: dto.scheduleAt,
        sentAt: dto.sentAt,
        sessionId: dto.sessionId,
      })
      .returning();

    return message;
  }

  async incrementViewsCount(messageId: number) {
    await db
      .update(messages)
      .set({
        viewsCount: sql`${messages.viewsCount} + 1`,
      })
      .where(eq(messages.id, messageId));
  }

  async deleteManyByIds(messageIds: number[]): Promise<void> {
    await db.delete(messages).where(inArray(messages.id, messageIds));
  }

  async updateOneById(messageId: number, data: Partial<Pick<Message, "text" | "scheduledAt" | "isDeleted">>): Promise<Message> {
    const [message] = await db.update(messages).set(data).where(eq(messages.id, messageId)).returning();

    return message;
  }
}
