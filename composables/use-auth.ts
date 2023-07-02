import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function () {
  const { $auth } = useNuxtApp();
  const { user } = useUser();
  const session = useCookie("session");

  const provider = new GoogleAuthProvider();

  async function signIn() {
    const auth = await signInWithPopup($auth, provider);
    session.value = await auth.user.getIdToken();
    return reloadNuxtApp({ path: "/" });
  }

  async function signOut() {
    await $auth.signOut();
    user.value = undefined;
    session.value = undefined;
    return reloadNuxtApp({ path: "/" });
  }

  return {
    signIn,
    signOut,
  };
}
