import { Room } from "../../entities/Room";
import { CreateRoomDto } from "./dto/CreateRoomDto";

export interface RoomRepository {
  getOneById(id: number): Promise<Room | null>;
  addOne(dto: CreateRoomDto): Promise<Room>;
  getManyByIds(ids: number[]): Promise<Room[]>;
  updateOneById(roomId: number, data: Partial<Pick<Room, "participantsCount" | "name" | "messagesCount" | "pendingInvitationsCount">>): Promise<Room>;
}
