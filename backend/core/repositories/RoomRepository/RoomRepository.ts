import { Room } from "../../entities/Room";
import { CreateRoomDto } from "./dto/CreateRoomDto";

export type GetManyByUserByOptions = {
  limit: number;
  offset: number;
  sortBy?: "CREATED_AT_DESC" | "CREATED_AT_ASC" | "JOINED_AT_DESC" | "JOINED_AT_ASC";
  search?: string;
};

export interface RoomRepository {
  getOneById(id: number): Promise<Room | null>;
  addOne(dto: CreateRoomDto): Promise<number>;
  getManyByUserId(userId: number, options: GetManyByUserByOptions): Promise<Room[]>;
  updateOneById(roomId: number, data: Partial<Pick<Room, "participantsCount" | "name" | "messagesCount" | "pendingInvitationsCount">>): Promise<void>;
}
