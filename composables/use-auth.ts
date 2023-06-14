import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function () {
  const { $auth } = useNuxtApp();

  const provider = new GoogleAuthProvider();

  async function signIn() {
    await signInWithPopup($auth, provider);
  }

  async function signOut() {
    await $auth.signOut();
  }

  return {
    signIn,
    signOut,
  };
}
