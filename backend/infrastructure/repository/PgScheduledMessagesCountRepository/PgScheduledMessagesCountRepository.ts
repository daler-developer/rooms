import { injectable } from "inversify";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";
import { ScheduledMessagesCountRepository } from "../../../core/repositories/ScheduledMessagesCountRepository/ScheduledMessagesCountRepository";
import { number } from "yup";
import { AddScheduledMessagesCountRepositoryDto } from "../../../core/repositories/ScheduledMessagesCountRepository/dto/AddScheduledMessagesCountRepositoryDto";
import { ScheduledMessagesCount } from "../../../core/entities/ScheduledMessagesCount";
import db from "../../db";
import { scheduledMessagesCount } from "../../entities/ScheduledMessagesCount";

@injectable()
export class PgScheduledMessagesCountRepository implements ScheduledMessagesCountRepository {
  async getOneByPk({ userId, roomId }: { userId: number; roomId: number }): Promise<ScheduledMessagesCount> {
    const [result] = await db
      .select()
      .from(scheduledMessagesCount)
      .where(and(eq(scheduledMessagesCount.userId, userId), eq(scheduledMessagesCount.roomId, roomId)));

    return result;
  }

  async addOne(dto: AddScheduledMessagesCountRepositoryDto): Promise<void> {
    await db.insert(scheduledMessagesCount).values({
      userId: dto.userId,
      roomId: dto.roomId,
      count: dto.count,
    });
  }

  async updateOneByPk(
    {
      userId,
      roomId,
    }: {
      userId: number;
      roomId: number;
    },
    data: Partial<Pick<ScheduledMessagesCount, "count">>,
  ): Promise<ScheduledMessagesCount> {
    const [count] = await db
      .update(scheduledMessagesCount)
      .set(data)
      .where(and(eq(scheduledMessagesCount.userId, userId), eq(scheduledMessagesCount.roomId, roomId)))
      .returning();

    return count;
  }
}
