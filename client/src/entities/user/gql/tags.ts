import { gql } from "@/__generated__";

const GET_ME_ID_ONLY = gql(`
  query GetMeIdOnly {
    me {
      id
    }
  }
`);

// TODO: remove
const GET_ME = gql(`
  query GetMeTemp {
    me {
      id
      email
    }
  }
`);

export { GET_ME, GET_ME_ID_ONLY };
