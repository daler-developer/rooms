import { UserToRoomParticipationAddOneDto } from "./dto/UserToRoomParticipationAddOneDto";
import { UserToRoomParticipationAddManyDto } from "./dto/UserToRoomParticipationAddManyDto";
import { UserToRoomParticipation } from "../../entities/UserToRoomParticipation";

export interface UserToRoomParticipationRepository {
  addOne(dto: UserToRoomParticipationAddOneDto): Promise<void>;
  addMany(dto: UserToRoomParticipationAddManyDto): Promise<void>;
  deleteOneByPk(userId: number, roomId: number): Promise<void>;
  getManyByRoomId(roomId: number): Promise<UserToRoomParticipation[]>;
}
