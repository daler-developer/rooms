import { BaseError } from "./base";
import { ERROR_CODE } from "./constants";

export class MessageNotFound extends BaseError {
  constructor() {
    super(ERROR_CODE.INVITATIONS_NOT_FOUND, "Invitation not found");
  }
}

export class MessagesDeleteForbidden extends BaseError {
  constructor() {
    super(ERROR_CODE.MESSAGES_DELETE_FORBIDDEN, "You cannot delete the message");
  }
}
