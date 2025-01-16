import { gql } from "@/__generated__";

const EMAIL_FORM_GET_ME = gql(`
  query EmailFormGetMe {
    me {
      id
      email
    }
  }
`);

const EDIT_MY_EMAIL = gql(`
  mutation EditMyEmail($input: EditMyEmailInput!) {
    editMyEmail(input: $input) {
      id
      email
    }
  }
`);

export { EMAIL_FORM_GET_ME, EDIT_MY_EMAIL };
