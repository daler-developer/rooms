import { AddUserToRoomDto } from "./dto/AddUserToRoomDto";

export interface UserToRoomRepository {
  addUserToRoom(dto: AddUserToRoomDto): Promise<void>;
}
