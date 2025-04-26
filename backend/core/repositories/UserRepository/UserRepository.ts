import { User } from "../../entities/User";
import { AddUserDto } from "./dto/AddUserDto";

export interface UserRepository {
  addOne(dto: AddUserDto): Promise<User>;
  getOneById(id: number): Promise<User | null>;
  getOneByEmail(email: string): Promise<User | null>;
  getMany(arg: { offset: number; limit: number; excludeIds: number[]; q: string }): Promise<User[]>;
  updateOneById(id: number, data: Partial<Exclude<User, "id">>): Promise<User>;
  getManyByIds(ids: number[]): Promise<User[]>;
}
