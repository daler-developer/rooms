import { GraphQLError } from "graphql";

export class NotAuthenticatedGraphQLError extends GraphQLError {
  constructor() {
    super("Not authenticated", {
      extensions: {
        code: "NOT_AUTHENTICATED",
      },
    });
  }
}

export class MeIsBlockedGraphQLError extends GraphQLError {
  constructor() {
    super("You are blocked", {
      extensions: {
        code: "ME_BLOCKED",
      },
    });
  }
}

export class UserNotFoundGraphQLError extends GraphQLError {
  constructor() {
    super("User not found", {
      extensions: {
        code: "USER_NOT_FOUND",
      },
    });
  }
}

export class IncorrectPasswordGraphQLError extends GraphQLError {
  constructor() {
    super("Incorrect password", {
      extensions: {
        code: "INCORRECT_PASSWORD",
      },
    });
  }
}
