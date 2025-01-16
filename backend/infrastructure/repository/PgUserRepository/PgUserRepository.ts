import { eq, like, notInArray, count, sql, inArray, and } from "drizzle-orm";
import { UserRepository } from "../../../core/repositories/UserRepository/UserRepository";
import { User } from "../../../core/entities/User";
import db from "../../db";
import { users } from "../../entities/User";
import { injectable } from "inversify";
import { number } from "yup";
import { usersToRooms } from "../../entities/UsersToRooms";
import { AddUserDto } from "../../../core/repositories/UserRepository/dto/AddUserDto";

@injectable()
class PgUserRepository implements UserRepository {
  async addOne(dto: AddUserDto): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
        profilePictureUrl: dto.profilePictureUrl,
      })
      .returning();

    return user;
  }

  async getUsers() {
    const result = await db.select().from(users);

    return result;
  }

  async getMany({ offset, limit, excludeIds, q }: { offset: number; limit: number; excludeIds: number[]; q: string }) {
    let query = db.select().from(users);

    const conditions = [];

    if (excludeIds.length) {
      conditions.push(notInArray(users.id, excludeIds));
    }

    if (q) {
      conditions.push(like(users.email, `%${q}%`));
    }

    query
      .where(and(...conditions))
      .offset(offset)
      .limit(limit);

    return query;
  }

  async getManyCount({ offset, excludeIds, q }: { offset: number; excludeIds: number[]; q: string }) {
    let query = db.select().from(users);

    if (excludeIds.length) {
      // @ts-ignore
      query = query.where(notInArray(users.id, excludeIds));
    }
    // @ts-ignore
    query = query.where(like(users.email, `%${q}%`)).offset(offset);

    return query;
  }

  async getById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    return user;
  }

  async getOneById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    return user;
  }

  async getOneByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    return user;
  }

  async setIsBlocked(userId: number, to: boolean) {
    await db
      .update(users)
      .set({
        isBlocked: to,
      })
      .where(eq(users.id, userId));
  }

  async updateEmail(userId: number, newEmail: string) {
    await db
      .update(users)
      .set({
        email: newEmail,
      })
      .where(eq(users.id, userId));
  }

  async updatePassword(userId: number, newPassword: string) {
    await db
      .update(users)
      .set({
        password: newPassword,
      })
      .where(eq(users.id, userId));
  }

  async removeAvatar(userId: number): Promise<void> {
    await db
      .update(users)
      .set({
        profilePictureUrl: null,
      })
      .where(eq(users.id, userId));
  }

  async updateOneById(userId: number, data: Partial<Exclude<User, "id">>): Promise<User> {
    const [user] = await db.update(users).set(data).where(eq(users.id, userId)).returning();

    return user;
  }

  async getManyByRoomId(roomId: number): Promise<User[]> {
    const result = await db.select().from(users).where(sql`
        exists (
          select 1 from ${usersToRooms}
            where ${usersToRooms.userId} = ${users.id} and ${usersToRooms.roomId} = ${roomId}
          )
    `);

    return result;
  }

  async getManyByIds(ids: number[]): Promise<User[]> {
    if (ids.length === 0) {
      return [];
    }

    return db.select().from(users).where(inArray(users.id, ids));
  }
}

export default PgUserRepository;
