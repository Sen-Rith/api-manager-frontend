export default defineNuxtRouteMiddleware(async () => {
  const { user, getUser, subscribeToUser } = useUser();
  const theme = useTheme();
  const cookieTheme = useCookie("theme");
  const session = useCookie("session");

  if (process.server) {
    if (session.value) {
      await getUser();
      theme.value = user.value?.theme || cookieTheme.value || "light";
    } else {
      theme.value = cookieTheme.value || "light";
    }
  }

  if (process.client && !!session.value) {
    subscribeToUser();
  }
});
