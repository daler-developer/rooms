import { BaseError } from "./base";
import { ERROR_CODE } from "./constants";

export class IncorrectPasswordError extends BaseError {
  constructor() {
    super(ERROR_CODE.AUTH_INCORRECT_PASSWORD, "Incorrect password");
  }
}

export class UserWithEmailAlreadyExists extends BaseError {
  constructor() {
    super(ERROR_CODE.AUTH_USER_WITH_EMAIL_ALREADY_EXISTS, "User with email already exists");
  }
}

export class EditEmailForbidden extends BaseError {
  constructor() {
    super(ERROR_CODE.AUTH_EDIT_EMAIL_FORBIDDEN, "You can only edit your own email");
  }
}

export class ExcludeUserFromRoomForbidden extends BaseError {
  constructor() {
    super(ERROR_CODE.AUTH_EXCLUDE_USER_FROM_ROOM_FORBIDDEN, "Not allowed to exclude user from room");
  }
}
