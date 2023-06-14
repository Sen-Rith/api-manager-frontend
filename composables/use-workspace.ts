import {
  CreateWorkspaceInput,
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables,
  IsWorkspaceSlugAvailableQuery,
  Workspace,
} from "~/generated/graphql";
import { CREATE_WORKSPACE } from "~/graphql/mutations";
import { IS_WORKSPACE_SLUG_AVAILABLE } from "~/graphql/queries";

export default function () {
  const { $apolloClient } = useNuxtApp();

  const workspace = useState<Workspace | null>("workspace", () => null);

  async function isWorkspaceSlugAvailable(slug: string) {
    const { data } = await $apolloClient.query<IsWorkspaceSlugAvailableQuery>({
      query: IS_WORKSPACE_SLUG_AVAILABLE,
      variables: {
        slug,
      },
    });
    return data.isWorkspaceSlugAvailable;
  }

  async function createWorkspace(input: CreateWorkspaceInput) {
    const { data } = await $apolloClient.mutate<
      CreateWorkspaceMutation,
      CreateWorkspaceMutationVariables
    >({
      mutation: CREATE_WORKSPACE,
      variables: {
        input,
      },
    });
    if (!data) return;
    workspace.value = data.createWorkspace;
  }

  return {
    workspace,
    isWorkspaceSlugAvailable,
    createWorkspace,
  };
}
