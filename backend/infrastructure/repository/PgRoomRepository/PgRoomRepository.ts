import { injectable } from "inversify";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";
import { GetManyByUserByOptions, RoomRepository } from "../../../core/repositories/RoomRepository/RoomRepository";
import { CreateRoomDto } from "../../../core/repositories/RoomRepository/dto/CreateRoomDto";
import db from "../../db";
import { rooms } from "../../entities/Room";
import { usersToRooms } from "../../entities/UsersToRooms";
import { Room } from "../../../core/entities/Room";

@injectable()
export class PgRoomRepository implements RoomRepository {
  async getOneById(id: number) {
    const [room] = await db.select().from(rooms).where(eq(rooms.id, id));

    return room;
  }

  async getManyByUserId(userId: number, { offset, limit, sortBy, search }: GetManyByUserByOptions) {
    let query = db
      .select({
        id: rooms.id,
        name: rooms.name,
        creatorId: rooms.creatorId,
        createdAt: rooms.createdAt,
        participantsCount: rooms.participantsCount,
        messagesCount: rooms.messagesCount,
        pendingInvitationsCount: rooms.pendingInvitationsCount,
        thumbnailUrl: rooms.thumbnailUrl,
      })
      .from(rooms)
      .innerJoin(usersToRooms, and(eq(usersToRooms.userId, userId), eq(usersToRooms.roomId, rooms.id)))
      .groupBy(rooms.id)
      .where(
        and(
          sql`
          exists (
            select 1 from ${usersToRooms}
            where ${usersToRooms.userId} = ${userId} and ${usersToRooms.roomId} = ${rooms.id}
          )
        `,
          like(rooms.name, `%${search || ""}%`),
        ),
      );

    if (sortBy === "CREATED_AT_ASC") {
      query.orderBy(asc(rooms.createdAt));
    }

    if (sortBy === "CREATED_AT_DESC") {
      query.orderBy(desc(rooms.createdAt));
    }

    if (sortBy === "JOINED_AT_ASC") {
      query.orderBy(asc(sql`max(${usersToRooms.createdAt})`));
    }

    if (sortBy === "JOINED_AT_DESC") {
      query.orderBy(desc(sql`max(${usersToRooms.createdAt})`));
    }

    query.offset(offset).limit(limit);

    return query;
  }

  async addOne(dto: CreateRoomDto) {
    const [{ insertedId }] = await db
      .insert(rooms)
      .values({
        creatorId: dto.creatorId,
        name: dto.name,
        thumbnailUrl: dto.thumbnailUrl,
      })
      .returning({
        insertedId: rooms.id,
      });

    return insertedId;
  }

  async updateOneById(roomId: number, data: Partial<Pick<Room, "participantsCount" | "name" | "pendingInvitationsCount">>): Promise<void> {
    await db.update(rooms).set(data).where(eq(rooms.id, roomId));
  }
}
