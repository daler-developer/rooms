import { injectable } from "inversify";
import { UserToRoomParticipationRepository } from "../../../core/repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import { UserToRoomParticipationAddOneDto } from "../../../core/repositories/UserToRoomParticipationRepository/dto/UserToRoomParticipationAddOneDto";
import { UserToRoomParticipationAddManyDto } from "../../../core/repositories/UserToRoomParticipationRepository/dto/UserToRoomParticipationAddManyDto";
import db from "../../db";
import { usersToRooms } from "../../entities/UsersToRooms";
import { number } from "yup";
import { and, eq, inArray } from "drizzle-orm";
import { usersToRoomsInvite } from "../../entities/UsersToRoomsInvite";
import { UserToRoomParticipation } from "../../../core/entities/UserToRoomParticipation";
import { rooms } from "../../entities/Room";
import { users } from "../../entities/User";

(async () => {
  const list = await db.select().from(usersToRooms);

  console.log("list", list);
})();

@injectable()
export class PgUserToRoomParticipationRepository implements UserToRoomParticipationRepository {
  async addOne({ roomId, userId }: UserToRoomParticipationAddOneDto): Promise<void> {
    await db.insert(usersToRooms).values({
      roomId,
      userId,
    });
  }

  async addMany({ roomId, userIds }: UserToRoomParticipationAddManyDto): Promise<void> {
    for (const userId of userIds) {
      await db.insert(usersToRooms).values({
        roomId,
        userId,
      });
    }
  }

  async deleteOneByPk(userId: number, roomId: number): Promise<void> {
    await db.delete(usersToRooms).where(and(eq(usersToRooms.userId, userId), eq(usersToRooms.roomId, roomId)));
  }

  async getOneByPk(pk: Pick<UserToRoomParticipation, "userId" | "roomId">): Promise<UserToRoomParticipation | null> {
    const [entity] = await db
      .select()
      .from(usersToRooms)
      .where(and(eq(usersToRooms.userId, pk.userId), eq(usersToRooms.roomId, pk.roomId)));
    return entity;
  }

  async getManyByRoomId(roomId: number): Promise<UserToRoomParticipation[]> {
    return db.select().from(usersToRooms).where(eq(usersToRooms.roomId, roomId));
  }

  async getManyByUserIds(userIds: number[]): Promise<UserToRoomParticipation[]> {
    return db.select().from(usersToRooms).where(inArray(usersToRooms.userId, userIds));
  }

  async getManyByUserId(userId: number): Promise<UserToRoomParticipation[]> {
    return db.select().from(usersToRooms).where(eq(usersToRooms.userId, userId));
  }
}
