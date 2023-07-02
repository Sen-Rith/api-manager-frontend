import {
  WorkspaceList,
  WorkspaceListQuery,
  WorkspaceListQueryVariables,
} from "~/generated/graphql";
import { GET_WORKSPACE_LIST } from "~/graphql/queries";

export default function () {
  const { $apolloClient } = useNuxtApp();
  const { workspace } = useWorkspace();

  const workspaceList = useState<WorkspaceList | undefined>(
    "workspaceList",
    () => undefined
  );

  async function getWorkspaceList() {
    const { data, errors } = await $apolloClient.query<
      WorkspaceListQuery,
      WorkspaceListQueryVariables
    >({
      query: GET_WORKSPACE_LIST,
      variables: {
        excludeIds: workspace.value ? [workspace.value.id] : undefined,
      },
    });
    if (errors) {
      throw createError({
        statusCode: (errors[0].extensions.status as number) ?? 500,
        statusMessage: errors[0].message,
      });
    }
    return data.workspaceList;
  }

  async function getMoreWorkspaces() {
    const { data, errors } = await $apolloClient.query<
      WorkspaceListQuery,
      WorkspaceListQueryVariables
    >({
      query: GET_WORKSPACE_LIST,
      variables: {
        skip: workspaceList.value?.workspaces.length,
        excludeIds: workspace.value ? [workspace.value.id] : null,
      },
    });
    if (errors) {
      throw createError({
        statusCode: (errors[0].extensions.status as number) ?? 500,
        statusMessage: errors[0].message,
      });
    }
    return data.workspaceList;
  }

  return {
    workspaceList,
    getWorkspaceList,
    getMoreWorkspaces,
  };
}
