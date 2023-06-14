import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(async () => {
  const { user } = useUser();
  const theme = useTheme();
  const cookieTheme = useCookie("theme");

  const config = useRuntimeConfig();

  const firebaseConfig: FirebaseOptions = {
    apiKey: config.public.API_KEY,
    authDomain: config.public.AUTH_DOMAIN,
    projectId: config.public.PROJECT_ID,
    storageBucket: config.public.STORAGE_BUCKET,
    messagingSenderId: config.public.MESSAGING_SENDER_ID,
    appId: config.public.APP_ID,
    measurementId: config.public.MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  auth.onIdTokenChanged(async (firebaseUser) => {
    const session = useCookie("session");

    if (!firebaseUser && !!user.value) {
      user.value = null;
      session.value = null;
      return reloadNuxtApp({ path: "/", force: true });
    }

    if (
      (firebaseUser && !user.value) ||
      (firebaseUser && user.value && firebaseUser.email !== user.value.email)
    ) {
      session.value = await firebaseUser.getIdToken();
      return reloadNuxtApp({ path: "/", force: true });
    }

    if (firebaseUser) session.value = await firebaseUser.getIdToken();
  });

  return {
    provide: {
      auth,
    },
  };
});
