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

export const SUBSCRIBE_TO_WORKSPACE = gql`
  subscription SubscribeToWorkspace($id: String!) {
    subscribeToWorkspace(id: $id) {
      mutation
      workspace {
        color
        icon
        id
        name
        slug
      }
    }
  }
`;
