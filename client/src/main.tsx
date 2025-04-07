import ReactDOM from "react-dom/client";
import "./index.css";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import App from "@/app/App.tsx";
import { ToastProvider } from "@/shared/ui";
import { CropProvider } from "@/shared/crop";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "http://localhost:5003/graphql",
});

const authLink = setContext((_, { headers: defaultHeaders }) => {
  const token = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("sessionToken");

  const headers = {
    ...defaultHeaders,
    Authorization: token,
  };

  if (sessionToken) {
    headers.Session = sessionToken;
  }

  return {
    headers,
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:5003/graphql",
    connectionParams: () => {
      return {
        authToken: localStorage.getItem("token")!,
        sessionToken: sessionStorage.getItem("sessionToken"),
      };
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchUsers: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                data: [...(existing?.data || []), ...incoming.data],
                hasMore: incoming.hasMore,
              };
            },
          },
        },
      },
      Invitation: {
        keyFields: ["roomId", "userId"],
      },
      User: {
        fields: {
          rooms: {
            keyArgs: false,
            merge(existing, incoming) {
              return [...(existing || []), ...incoming];
            },
          },
        },
      },
      Room: {
        fields: {
          // messages: {
          //   keyArgs: false,
          //   merge(existing, incoming) {
          //     return {
          //       data: [...(existing?.data || []), ...incoming.data],
          //       hasMore: incoming.hasMore,
          //     };
          //   },
          // },
        },
      },
    },
  }),
});

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </ApolloProvider>
//   </React.StrictMode>,
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <ToastProvider>
      <CropProvider>
        <App />
      </CropProvider>
    </ToastProvider>
  </ApolloProvider>,
);
