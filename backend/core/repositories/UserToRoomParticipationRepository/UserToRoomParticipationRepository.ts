import { UserToRoomParticipationAddOneDto } from "./dto/UserToRoomParticipationAddOneDto";
import { UserToRoomParticipationAddManyDto } from "./dto/UserToRoomParticipationAddManyDto";
import { UserToRoomParticipation } from "../../entities/UserToRoomParticipation";

export interface UserToRoomParticipationRepository {
  addOne(dto: UserToRoomParticipationAddOneDto): Promise<void>;
  addMany(dto: UserToRoomParticipationAddManyDto): Promise<void>;
  getManyByUserId(userId: number): Promise<UserToRoomParticipation[]>;
  getOneByPk(pk: Pick<UserToRoomParticipation, "userId" | "roomId">): Promise<UserToRoomParticipation | null>;
  deleteOneByPk(userId: number, roomId: number): Promise<void>;
  getManyByRoomId(roomId: number): Promise<UserToRoomParticipation[]>;
  getManyByUserIds(userIds: number[]): Promise<UserToRoomParticipation[]>;
}
