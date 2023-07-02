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

  const user = useState<User | undefined>("user", () => undefined);

  const userSubscription = useState<
    SubscriptionCurrentObservable["subscription"] | undefined
  >("userSubscription", () => undefined);

  async function getUser() {
    const { data, errors } = await $apolloClient.query<UserQuery>({
      query: GET_USER,
    });
    if (errors) {
      throw createError({
        statusCode: (errors[0].extensions.status as number) ?? 500,
        statusMessage: errors[0].message,
      });
    }
    user.value = data.user;
  }

  async function updateUser(updatedUser: User) {
    const { data, errors } = await $apolloClient.mutate<
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
    if (!data || errors) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to update user",
      });
    }
    user.value = data.updateUser;
  }

  function subscribeToUser() {
    const subscription = $apolloClient.subscribe<SubscribeToUserSubscription>({
      query: SUBSCRIBE_TO_USER,
    });
    userSubscription.value = subscription.subscribe(({ data }) => {
      if (!data) return;
      if (user.value?.theme !== data.subscribeToUser.user.theme) {
        const cookieTheme = useCookie("theme");
        cookieTheme.value = data.subscribeToUser.user.theme;
        theme.value = data.subscribeToUser.user.theme;
      }
      user.value = data.subscribeToUser.user;
    });
  }

  function unSubscribeToUser() {
    userSubscription.value?.unsubscribe();
    userSubscription.value = undefined;
  }

  return {
    user,
    getUser,
    updateUser,
    subscribeToUser,
    unSubscribeToUser,
  };
}
