export default defineNuxtRouteMiddleware(async () => {
  const { user, getUser, subscribeToUserUpdated } = useUser();
  const theme = useTheme();
  const cookieTheme = useCookie("theme");

  if (process.server) {
    await getUser().catch(() => {});
    theme.value = user.value?.theme || cookieTheme.value || "light";
  }

  if (process.client) {
    subscribeToUserUpdated();
  }
});
