import { gql } from "@/__generated__";

export const REGISTER = gql(`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        firstName
        lastName
      }
      token
    }
  }
`);

export const CHECK_EMAIL_AVAILABILITY_FOR_REGISTER = gql(`
  query CheckEmailAvailability($email: String!) {
    checkEmailAvailability(email: $email)
  }
`);
