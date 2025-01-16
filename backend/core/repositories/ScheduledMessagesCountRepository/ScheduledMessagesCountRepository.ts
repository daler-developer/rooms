import { AddScheduledMessagesCountRepositoryDto } from "./dto/AddScheduledMessagesCountRepositoryDto";
import { ScheduledMessagesCount } from "../../entities/ScheduledMessagesCount";

export interface ScheduledMessagesCountRepository {
  addOne(dto: AddScheduledMessagesCountRepositoryDto): Promise<void>;
  getOneByPk(pk: { userId: number; roomId: number }): Promise<ScheduledMessagesCount | null>;
  updateOneByPk(pk: { userId: number; roomId: number }, data: Partial<Pick<ScheduledMessagesCount, "count">>): Promise<void>;
}
