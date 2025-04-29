import { BaseError } from "./base";
import { ERROR_CODE } from "./constants";

export class InvitationNotFound extends BaseError {
  constructor() {
    super(ERROR_CODE.INVITATIONS_NOT_FOUND, "Invitation not found");
  }
}

export class AlreadyInvited extends BaseError {
  constructor() {
    super(ERROR_CODE.INVITATIONS_USER_ALREADY_INVITED, "User is already invited");
  }
}
