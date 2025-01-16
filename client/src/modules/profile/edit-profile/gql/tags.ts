import { gql } from "@/__generated__";

export const GET_ME = gql(`
  query EditProfileGetMe {
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
  mutation EditProfileEditFirstName($firstName: String!) {
    userUpdateFirstName(newFirstName: $firstName) {
      id
      firstName
    }
  }
`);

export const EDIT_LAST_NAME = gql(`
  mutation EditProfileEditLastName($lastName: String!) {
    userUpdateLastName(newLastName: $lastName) {
      id
      lastName
    }
  }
`);

export const REMOVE_AVATAR = gql(`
  mutation EditProfileRemoveMyAvatar {
    removeMyAvatar {
      id
      profilePictureUrl
    }
  }
`);

export const UPLOAD_PROFILE_PICTURE = gql(`
  mutation EditProfileUploadProfilePicture($input: UploadProfilePictureInput!) {
    uploadProfilePicture(input: $input) {
      id
      profilePictureUrl
    }
  }
`);
