import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      theme
      displayName
      photoURL
    }
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      color
      icon
      id
      name
      slug
    }
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {
    updateWorkspace(input: $input) {
      color
      icon
      id
      name
      slug
    }
  }
`;

export const REMOVE_WORKSPACE = gql`
  mutation RemoveWorkspace($id: String!) {
    removeWorkspace(id: $id) {
      id
    }
  }
`;
