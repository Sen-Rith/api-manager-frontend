import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

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

  const wsLink = new GraphQLWsLink(
    createClient({
      url: config.public.GRAPHQL_WS,
      connectionParams: {
        Authorization: session.value,
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return {
    provide: {
      apolloClient,
    },
  };
});
