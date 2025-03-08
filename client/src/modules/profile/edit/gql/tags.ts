import { gql } from "@/__generated__";

export const GET_ME = gql(`
  query ProfileEditGetMe {
    me {
      id
      firstName
      lastName
      profilePictureUrl
      passwordLength
    }
  }
`);

export const EDIT_FIRST_NAME = gql(`
  mutation ProfileEditFirstName($input: EditFirstNameInput!) {
    editFirstName(input: $input) {
      id
      firstName
    }
  }
`);

export const EDIT_LAST_NAME = gql(`
  mutation ProfileEditLastName($input: EditLastNameInput!) {
    editLastName(input: $input) {
      id
      lastName
    }
  }
`);

export const EDIT_PROFILE_PICTURE = gql(`
  mutation ProfileEditProfilePicture($input: EditProfilePictureInput!) {
    editProfilePicture(input: $input) {
      id
      profilePictureUrl
    }
  }
`);

export const RESET_PASSWORD = gql(`
  mutation ProfileEditResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      id
      passwordLength
    }
  }
`);
