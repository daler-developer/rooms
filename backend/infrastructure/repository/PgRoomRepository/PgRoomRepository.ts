import { injectable } from "inversify";
import { and, asc, desc, eq, inArray, like, sql } from "drizzle-orm";
import { RoomRepository } from "../../../core/repositories/RoomRepository/RoomRepository";
import { CreateRoomDto } from "../../../core/repositories/RoomRepository/dto/CreateRoomDto";
import db from "../../db";
import { rooms } from "../../entities/Room";
import { usersToRooms } from "../../entities/UsersToRooms";
import { Room } from "../../../core/entities/Room";
import { users } from "../../entities/User";

@injectable()
export class PgRoomRepository implements RoomRepository {
  async getOneById(id: number) {
    const [room] = await db.select().from(rooms).where(eq(rooms.id, id));

    return room;
  }

  async getManyByIds(ids: number[]): Promise<Room[]> {
    return db.select().from(rooms).where(inArray(rooms.id, ids));
  }

  async addOne(dto: CreateRoomDto) {
    const [room] = await db
      .insert(rooms)
      .values({
        creatorId: dto.creatorId,
        name: dto.name,
        thumbnailUrl: dto.thumbnailUrl,
        sessionId: dto.sessionId,
      })
      .returning();

    return room;
  }

  async updateOneById(roomId: number, data: Partial<Pick<Room, "participantsCount" | "name" | "pendingInvitationsCount">>): Promise<Room> {
    const [room] = await db.update(rooms).set(data).where(eq(rooms.id, roomId)).returning();

    return room;
  }
}
