import { BaseError } from "./base";
import { ERROR_CODE } from "./constants";

export class UserNotFound extends BaseError {
  constructor() {
    super(ERROR_CODE.USERS_NOT_FOUND, "User not found");
  }
}

export class UserIsNotRoomParticipant extends BaseError {
  constructor() {
    super(ERROR_CODE.USERS_USER_IS_NOT_ROOM_PARTICIPANT, "User is not room participant");
  }
}
