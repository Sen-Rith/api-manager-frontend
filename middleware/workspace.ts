export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useUser();
  const {
    workspace,
    getWorkspace,
    subscribeToWorkspace,
    unSubscribeToWorkspace,
  } = useWorkspace();

  if (!user.value) return navigateTo("/");

  const slug = to.params.workspaceSlug as string;

  if (!workspace.value || workspace.value.slug !== slug) {
    unSubscribeToWorkspace();
    workspace.value = await getWorkspace(slug);
  }

  if (process.client) subscribeToWorkspace();
});
