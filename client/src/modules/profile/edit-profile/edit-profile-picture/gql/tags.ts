import { gql } from "@/__generated__";

const GET_ME = gql(`
  query EditMyProfilePictureGetMe {
    me {
      id
      profilePictureUrl
    }
  }
`);

const REMOVE_AVATAR = gql(`
  mutation RemoveMyAvatar {
    removeMyAvatar {
      id
      profilePictureUrl
    }
  }
`);

const UPLOAD_PROFILE_PICTURE = gql(`
  mutation UploadProfilePictureInput($input: UploadProfilePictureInput!) {
    uploadProfilePicture(input: $input) {
      id
      profilePictureUrl
    }
  }
`);

export { GET_ME, REMOVE_AVATAR, UPLOAD_PROFILE_PICTURE };
