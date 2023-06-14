import gql from "graphql-tag";

export const GET_USER = gql`
  query User {
    user {
      id
      email
      theme
      displayName
      photoURL
    }
  }
`;

export const GET_WORKSPACE_LIST = gql`
  query WorkspaceList($skip: Int, $take: Int) {
    workspaceList(skip: $skip, take: $take) {
      hasMore
      workspaces {
        id
        name
        icon
        color
        slug
      }
    }
  }
`;

export const IS_WORKSPACE_SLUG_AVAILABLE = gql`
  query isWorkspaceSlugAvailable($slug: String!) {
    isWorkspaceSlugAvailable(slug: $slug)
  }
`;

export const GET_WORKSPACE = gql`
  query GetWorkspace($workspaceId: String!) {
    workspace(id: $workspaceId) {
      color
      icon
      id
      name
      slug
    }
  }
`;
