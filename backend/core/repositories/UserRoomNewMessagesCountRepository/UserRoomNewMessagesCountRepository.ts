import { UserRoomNewMessagesCountAddDto } from "./dto/UserRoomNewMessagesCountAddDto";
import { UserRoomNewMessagesCount } from "../../entities/UserRoomNewMessagesCount";

export interface UserRoomNewMessagesCountRepository {
  addOne(dto: UserRoomNewMessagesCountAddDto): Promise<UserRoomNewMessagesCountAddDto>;
  getOneByPk(pk: Pick<UserRoomNewMessagesCount, "roomId" | "userId">): Promise<UserRoomNewMessagesCount | null>;
  updateOneByPk(
    pk: Pick<UserRoomNewMessagesCount, "roomId" | "userId">,
    data: Partial<Pick<UserRoomNewMessagesCount, "count">>,
  ): Promise<UserRoomNewMessagesCount>;
  deleteOneByPk(pk: Pick<UserRoomNewMessagesCount, "roomId" | "userId">): Promise<void>;
}
