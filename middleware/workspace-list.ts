export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useUser();
  const { workspaceList, getWorkspaceList } = useWorkspaceList();

  if (process.client) return;

  if (!user.value) return;

  await getWorkspaceList().catch(() => {});

  if (workspaceList.value && to.path === "/") {
    if (workspaceList.value.workspaces.length === 0) {
      return navigateTo("/new-workspace");
    }
    if (workspaceList.value.workspaces.length === 1) {
      return navigateTo("/workspace/" + workspaceList.value.workspaces[0].slug);
    }
  }

  console.log("RUN");
});
