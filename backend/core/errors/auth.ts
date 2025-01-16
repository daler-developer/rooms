import { BaseError } from "./base";

export class IncorrectPasswordError extends BaseError {
  constructor() {
    super("auth/incorrect-password", "Incorrect password");
  }
}

export class UserWithEmailAlreadyExists extends BaseError {
  constructor() {
    super("auth/user-with-email-already-exists", "User with email already exists");
  }
}

export class EditEmailForbidden extends BaseError {
  constructor() {
    super("auth/edit-email-forbidden", "You can only edit your own email");
  }
}
