export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useUser();
  const { workspaceList, getWorkspaceList } = useWorkspaceList();

  if (!user.value) return;

  const currentWorkspaceList = await getWorkspaceList();
  workspaceList.value = currentWorkspaceList;

  if (workspaceList.value.workspaces.length === 0) {
    return navigateTo("/new-workspace");
  } else {
    return navigateTo("/workspace/" + workspaceList.value.workspaces[0].slug);
  }
});
