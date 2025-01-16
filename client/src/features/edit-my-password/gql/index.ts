import { gql } from "@/__generated__";

const PASSWORD_FORM_GET_ME = gql(`
  query PasswordFormGetMe {
    me {
      id
      passwordLength
    }
  }
`);

const EDIT_MY_PASSWORD = gql(`
  mutation EditMyPassword($input: EditMyPasswordInput!) {
    editMyPassword(input: $input) {
      id
      passwordLength
    }
  }
`);

export { PASSWORD_FORM_GET_ME, EDIT_MY_PASSWORD };
