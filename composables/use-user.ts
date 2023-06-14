import { SubscriptionCurrentObservable } from "@apollo/client";
import {
  SubscribeToUserSubscription,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
  UserQuery,
} from "~/generated/graphql";
import { UPDATE_USER } from "~/graphql/mutations";
import { GET_USER } from "~/graphql/queries";
import { SUBSCRIBE_TO_USER } from "~/graphql/subscriptions";

export default function () {
  const { $apolloClient } = useNuxtApp();
  const theme = useTheme();

  const user = useState<User | null>("user", () => null);

  const userUpdateSubscription = useState<
    SubscriptionCurrentObservable["subscription"] | null
  >("userUpdateSubscription", () => null);

  const onUserUpdate = $apolloClient.subscribe<SubscribeToUserSubscription>({
    query: SUBSCRIBE_TO_USER,
  });

  async function getUser() {
    const { data } = await $apolloClient.query<UserQuery>({
      query: GET_USER,
    });
    if (!data.user) return;
    user.value = data.user;
  }

  async function updateUser(updatedUser: User) {
    const { data } = await $apolloClient.mutate<
      UpdateUserMutation,
      UpdateUserMutationVariables
    >({
      mutation: UPDATE_USER,
      variables: {
        input: {
          theme: updatedUser.theme,
          displayName: updatedUser.displayName,
        },
      },
    });
    if (!data) return;
    user.value = data.updateUser;
  }

  function subscribeToUserUpdated() {
    userUpdateSubscription.value = onUserUpdate.subscribe(({ data }) => {
      if (!data) return;
      if (user.value?.theme !== data.subscribeToUser.user.theme) {
        const cookieTheme = useCookie("theme");
        cookieTheme.value = data.subscribeToUser.user.theme;
        theme.value = data.subscribeToUser.user.theme;
      }
      user.value = data.subscribeToUser.user;
    });
  }

  function unSubscribeToUserUpdated() {
    userUpdateSubscription.value?.unsubscribe();
    userUpdateSubscription.value = null;
  }

  return {
    user,
    getUser,
    updateUser,
    subscribeToUserUpdated,
    unSubscribeToUserUpdated,
  };
}
