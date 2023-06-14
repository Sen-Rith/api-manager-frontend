import {
  WorkspaceList,
  WorkspaceListQuery,
  WorkspaceListQueryVariables,
} from "~/generated/graphql";
import { GET_WORKSPACE_LIST } from "~/graphql/queries";

export default function () {
  const { $apolloClient } = useNuxtApp();

  const workspaceList = useState<WorkspaceList | null>(
    "workspaceList",
    () => null
  );

  async function getWorkspaceList() {
    const { data } = await $apolloClient.query<
      WorkspaceListQuery,
      WorkspaceListQueryVariables
    >({
      query: GET_WORKSPACE_LIST,
    });
    if (!data) return;
    workspaceList.value = data.workspaceList;
  }

  async function getMoreWorkspaces() {
    const { data } = await $apolloClient.query<
      WorkspaceListQuery,
      WorkspaceListQueryVariables
    >({
      query: GET_WORKSPACE_LIST,
      variables: {
        skip: workspaceList.value?.workspaces.length,
      },
    });
    if (!data) return;
    workspaceList.value = {
      hasMore: data.workspaceList.hasMore,
      workspaces: [
        ...workspaceList.value?.workspaces ?? [],
        ...data.workspaceList.workspaces,
      ],
    };
  }

  return {
    workspaceList,
    getWorkspaceList,
    getMoreWorkspaces,
  };
}
