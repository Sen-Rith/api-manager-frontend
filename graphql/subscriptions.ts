import gql from "graphql-tag";

export const SUBSCRIBE_TO_USER = gql`
  subscription SubscribeToUser {
    subscribeToUser {
      mutation
      user {
        id
        email
        theme
        displayName
        photoURL
      }
    }
  }
`;
