import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const session = useCookie("session");

  const httpLink = createHttpLink({
    uri: config.public.GRAPHQL_HOST,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: session.value ? `Bearer ${session.value}` : "",
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  });

  return {
    provide: {
      apolloClient,
    },
  };
});
