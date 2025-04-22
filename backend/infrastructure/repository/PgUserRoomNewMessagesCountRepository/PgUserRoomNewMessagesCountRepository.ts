import { UserRoomNewMessagesCountRepository } from "../../../core/repositories/UserRoomNewMessagesCountRepository/UserRoomNewMessagesCountRepository";
import { injectable } from "inversify";
import { UserRoomNewMessagesCountAddDto } from "../../../core/repositories/UserRoomNewMessagesCountRepository/dto/UserRoomNewMessagesCountAddDto";
import db from "../../db";
import { userRoomNewMessagesCount } from "../../entities/UserRoomNewMessagesCount";
import { UserRoomNewMessagesCount } from "../../../core/entities/UserRoomNewMessagesCount";
import { and, eq } from "drizzle-orm";

@injectable()
export class PgUserRoomNewMessagesCountRepository implements UserRoomNewMessagesCountRepository {
  async addOne(dto: UserRoomNewMessagesCountAddDto): Promise<UserRoomNewMessagesCountAddDto> {
    const [entity] = await db.insert(userRoomNewMessagesCount).values(dto).returning();

    return entity;
  }

  async getOneByPk(pk: Pick<UserRoomNewMessagesCount, "roomId" | "userId">): Promise<UserRoomNewMessagesCount | null> {
    const [entity] = await db
      .select()
      .from(userRoomNewMessagesCount)
      .where(and(eq(userRoomNewMessagesCount.userId, pk.userId), eq(userRoomNewMessagesCount.roomId, pk.roomId)));

    return entity;
  }

  async deleteOneByPk(pk: Pick<UserRoomNewMessagesCount, "roomId" | "userId">): Promise<void> {
    await db.delete(userRoomNewMessagesCount).where(and(eq(userRoomNewMessagesCount.roomId, pk.roomId), eq(userRoomNewMessagesCount.userId, pk.userId)));
  }

  async updateOneByPk(
    pk: Pick<UserRoomNewMessagesCount, "roomId" | "userId">,
    data: Partial<Pick<UserRoomNewMessagesCount, "count">>,
  ): Promise<UserRoomNewMessagesCount> {
    const [room] = await db
      .update(userRoomNewMessagesCount)
      .set(data)
      .where(and(eq(userRoomNewMessagesCount.roomId, pk.roomId), eq(userRoomNewMessagesCount.userId, pk.userId)))
      .returning();

    return room;
  }
}
