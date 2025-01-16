import { and, count, desc, eq } from "drizzle-orm";
import { injectable } from "inversify";

import { InvitationRepository } from "../../../core/repositories/InvitationRepository/InvitationRepository";
import db from "../../db";
import { usersToRoomsInvite } from "../../entities/UsersToRoomsInvite";
import { AddOneInvitationDto } from "../../../core/repositories/InvitationRepository/dto/AddOneInvitationDto";
import { Invitation } from "../../../core/entities/Invitation";
import { number } from "yup";

@injectable()
export class PgInvitationRepository implements InvitationRepository {
  async getOneByPk(userId: number, roomId: number): Promise<Invitation | null> {
    const [first] = await db
      .select()
      .from(usersToRoomsInvite)
      .where(and(eq(usersToRoomsInvite.roomId, roomId), eq(usersToRoomsInvite.userId, userId)));

    return first;
  }

  async getManyByRoomId(roomId: number): Promise<Invitation[]> {
    return db.select().from(usersToRoomsInvite).where(eq(usersToRoomsInvite.roomId, roomId));
  }

  async getManyByUserId(userId: number) {
    return db.select().from(usersToRoomsInvite).where(eq(usersToRoomsInvite.userId, userId)).orderBy(desc(usersToRoomsInvite.createdAt));
  }

  async getManyByUserIdCount(userId: number, { limit, offset }: { limit: number; offset: number }) {
    const [{ count: result }] = await db
      .select({ count: count() })
      .from(usersToRoomsInvite)
      .where(eq(usersToRoomsInvite.userId, userId))
      .offset(offset)
      .limit(limit);

    return result;
  }

  async getOneByRoomId(roomId: number) {
    const [result] = await db.select().from(usersToRoomsInvite).where(eq(usersToRoomsInvite.roomId, roomId));

    return result;
  }

  async deleteOne(userId: number, roomId: number) {
    await db.delete(usersToRoomsInvite).where(and(eq(usersToRoomsInvite.userId, userId), eq(usersToRoomsInvite.roomId, roomId)));
  }

  async addOne(dto: AddOneInvitationDto) {
    const [invitation] = await db
      .insert(usersToRoomsInvite)
      .values({
        roomId: dto.roomId,
        userId: dto.userId,
        inviterId: dto.inviterId,
      })
      .returning();

    return invitation;
  }
}
