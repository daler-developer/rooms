import { BaseError } from "./base";

export class UserNotFound extends BaseError {
  constructor() {
    super("users/not-found", "User not found");
  }
}
