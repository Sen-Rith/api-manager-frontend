import { SubscriptionCurrentObservable } from "@apollo/client";
import {
  CreateWorkspaceInput,
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables,
  GetWorkspaceQuery,
  GetWorkspaceQueryVariables,
  IsWorkspaceSlugAvailableQuery,
  RemoveWorkspaceMutation,
  RemoveWorkspaceMutationVariables,
  SubscribeToWorkspaceSubscription,
  SubscribeToWorkspaceSubscriptionVariables,
  UpdateWorkspaceInput,
  UpdateWorkspaceMutation,
  UpdateWorkspaceMutationVariables,
  Workspace,
} from "~/generated/graphql";
import {
  CREATE_WORKSPACE,
  REMOVE_WORKSPACE,
  UPDATE_WORKSPACE,
} from "~/graphql/mutations";
import { GET_WORKSPACE, IS_WORKSPACE_SLUG_AVAILABLE } from "~/graphql/queries";
import { SUBSCRIBE_TO_WORKSPACE } from "~/graphql/subscriptions";

export default function () {
  const { $apolloClient } = useNuxtApp();

  const workspace = useState<Workspace | undefined>(
    "workspace",
    () => undefined
  );
  const workspaceSubscription = useState<
    SubscriptionCurrentObservable["subscription"] | undefined
  >("workspaceSubscription", () => undefined);

  async function isWorkspaceSlugAvailable(slug: string) {
    const { data, errors } =
      await $apolloClient.query<IsWorkspaceSlugAvailableQuery>({
        query: IS_WORKSPACE_SLUG_AVAILABLE,
        variables: {
          slug,
        },
      });
    if (errors) {
      throw createError({
        statusCode: (errors[0].extensions.status as number) ?? 500,
        statusMessage: errors[0].message,
      });
    }
    return data.isWorkspaceSlugAvailable;
  }

  async function createWorkspace(input: CreateWorkspaceInput) {
    const { data, errors } = await $apolloClient.mutate<
      CreateWorkspaceMutation,
      CreateWorkspaceMutationVariables
    >({
      mutation: CREATE_WORKSPACE,
      variables: {
        input,
      },
    });
    if (!data || errors) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create workspace",
      });
    }
    return data.createWorkspace;
  }

  async function getWorkspace(slug: string) {
    const { data, errors } = await $apolloClient.query<
      GetWorkspaceQuery,
      GetWorkspaceQueryVariables
    >({
      query: GET_WORKSPACE,
      variables: {
        id: slug,
      },
    });
    if (errors) {
      throw createError({
        statusCode: (errors[0].extensions.status as number) ?? 500,
        statusMessage: errors[0].message,
      });
    }
    return data.workspace;
  }

  async function updateWorkspace(input: UpdateWorkspaceInput) {
    const { data, errors } = await $apolloClient.mutate<
      UpdateWorkspaceMutation,
      UpdateWorkspaceMutationVariables
    >({
      mutation: UPDATE_WORKSPACE,
      variables: {
        input,
      },
    });
    if (!data || errors) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to update workspace",
      });
    }
    return data.updateWorkspace;
  }

  async function removeWorkspace(id: string) {
    const { data, errors } = await $apolloClient.mutate<
      RemoveWorkspaceMutation,
      RemoveWorkspaceMutationVariables
    >({
      mutation: REMOVE_WORKSPACE,
      variables: {
        id,
      },
    });
    if (!data || errors) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to remove workspace",
      });
    }
    return data.removeWorkspace;
  }

  function subscribeToWorkspace() {
    if (!workspace.value) return;
    const subscription = $apolloClient.subscribe<
      SubscribeToWorkspaceSubscription,
      SubscribeToWorkspaceSubscriptionVariables
    >({
      query: SUBSCRIBE_TO_WORKSPACE,
      variables: { id: workspace.value.id },
    });
    workspaceSubscription.value = subscription.subscribe(async ({ data }) => {
      if (!data) return;

      if (data.subscribeToWorkspace.mutation === "DELETE") {
        workspace.value = undefined;
        return await navigateTo("/");
      }

      if (data.subscribeToWorkspace.mutation === "UPDATE") {
        if (
          workspace.value?.slug !== data.subscribeToWorkspace.workspace.slug
        ) {
          workspace.value = data.subscribeToWorkspace.workspace;
          return await navigateTo(`/workspaces/${workspace.value.slug}`);
        }
        workspace.value = data.subscribeToWorkspace.workspace;
      }
    });
  }

  function unSubscribeToWorkspace() {
    workspaceSubscription.value?.unsubscribe();
    workspaceSubscription.value = undefined;
  }

  return {
    workspace,
    isWorkspaceSlugAvailable,
    createWorkspace,
    getWorkspace,
    updateWorkspace,
    removeWorkspace,
    subscribeToWorkspace,
    unSubscribeToWorkspace,
  };
}
