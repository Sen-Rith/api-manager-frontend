/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n      email\n      theme\n      displayName\n      photoURL\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation CreateWorkspace($input: CreateWorkspaceInput!) {\n    createWorkspace(input: $input) {\n      color\n      icon\n      id\n      name\n      slug\n    }\n  }\n": types.CreateWorkspaceDocument,
    "\n  query User {\n    user {\n      id\n      email\n      theme\n      displayName\n      photoURL\n    }\n  }\n": types.UserDocument,
    "\n  query WorkspaceList($skip: Int, $take: Int) {\n    workspaceList(skip: $skip, take: $take) {\n      hasMore\n      workspaces {\n        id\n        name\n        icon\n        color\n        slug\n      }\n    }\n  }\n": types.WorkspaceListDocument,
    "\n  query isWorkspaceSlugAvailable($slug: String!) {\n    isWorkspaceSlugAvailable(slug: $slug)\n  }\n": types.IsWorkspaceSlugAvailableDocument,
    "\n  subscription SubscribeToUser {\n    subscribeToUser {\n      mutation\n      user {\n        id\n        email\n        theme\n        displayName\n        photoURL\n      }\n    }\n  }\n": types.SubscribeToUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n      email\n      theme\n      displayName\n      photoURL\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n      email\n      theme\n      displayName\n      photoURL\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateWorkspace($input: CreateWorkspaceInput!) {\n    createWorkspace(input: $input) {\n      color\n      icon\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWorkspace($input: CreateWorkspaceInput!) {\n    createWorkspace(input: $input) {\n      color\n      icon\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User {\n    user {\n      id\n      email\n      theme\n      displayName\n      photoURL\n    }\n  }\n"): (typeof documents)["\n  query User {\n    user {\n      id\n      email\n      theme\n      displayName\n      photoURL\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query WorkspaceList($skip: Int, $take: Int) {\n    workspaceList(skip: $skip, take: $take) {\n      hasMore\n      workspaces {\n        id\n        name\n        icon\n        color\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorkspaceList($skip: Int, $take: Int) {\n    workspaceList(skip: $skip, take: $take) {\n      hasMore\n      workspaces {\n        id\n        name\n        icon\n        color\n        slug\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query isWorkspaceSlugAvailable($slug: String!) {\n    isWorkspaceSlugAvailable(slug: $slug)\n  }\n"): (typeof documents)["\n  query isWorkspaceSlugAvailable($slug: String!) {\n    isWorkspaceSlugAvailable(slug: $slug)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription SubscribeToUser {\n    subscribeToUser {\n      mutation\n      user {\n        id\n        email\n        theme\n        displayName\n        photoURL\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription SubscribeToUser {\n    subscribeToUser {\n      mutation\n      user {\n        id\n        email\n        theme\n        displayName\n        photoURL\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;