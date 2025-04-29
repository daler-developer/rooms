import { BaseError } from "./base";
import { ERROR_CODE } from "./constants";

export class RoomNotFound extends BaseError {
  constructor() {
    super(ERROR_CODE.ROOMS_NOT_FOUND, "Room is not found");
  }
}
