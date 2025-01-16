import { User } from "../../entities/User";
import { AddUserDto } from "./dto/AddUserDto";

export interface UserRepository {
  addOne(dto: AddUserDto): Promise<User>;
  getById(id: number): Promise<User | null>;
  getOneById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getOneByEmail(email: string): Promise<User | null>;
  setIsBlocked(userId: number, to: boolean): Promise<void>;
  updateEmail(userId: number, newEmail: string): Promise<void>;
  updatePassword(userId: number, newPassword: string): Promise<void>;
  removeAvatar(userId: number): Promise<void>;
  getMany(arg: { offset: number; limit: number; excludeIds: number[]; q: string }): Promise<User[]>;
  getManyCount(arg: { offset: number; excludeIds: number[]; q: string }): Promise<User[]>;
  updateOneById(id: number, data: Partial<Exclude<User, "id">>): Promise<User>;
  getManyByRoomId(roomId: number): Promise<User[]>;
  getManyByIds(ids: number[]): Promise<User[]>;
}
