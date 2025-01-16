import { Invitation } from "../../entities/Invitation";
import { AddOneInvitationDto } from "./dto/AddOneInvitationDto";

export interface InvitationRepository {
  getOneByPk(userId: number, roomId: number): Promise<Invitation | null>;
  getOneByRoomId(roomId: number): Promise<Invitation | null>;
  getManyByUserId(userId: number): Promise<Invitation[]>;
  getManyByUserIdCount(userId: number, options: { offset: number; limit: number }): Promise<number>;
  getManyByRoomId(roomId: number): Promise<Invitation[]>;
  deleteOne(userId: number, roomId: number): Promise<void>;
  addOne(dto: AddOneInvitationDto): Promise<Invitation>;
}
