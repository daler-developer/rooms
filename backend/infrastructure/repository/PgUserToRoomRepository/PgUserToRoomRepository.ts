import { UserToRoomRepository } from "../../../core/repositories/UserToRoomRepository/UserToRoomRepository";
import { injectable } from "inversify";
import { AddUserToRoomDto } from "../../../core/repositories/UserToRoomRepository/dto/AddUserToRoomDto";

@injectable()
class PgUserToRoomRepository implements UserToRoomRepository {
  async addUserToRoom(dto: AddUserToRoomDto) {}
}

export default PgUserToRoomRepository;
