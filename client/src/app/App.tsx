import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/app/router.tsx";
import useStartSessionMutation from "./gql/useStartSessionMutation.ts";
import useGetMeQuery from "./gql/useGetMeQuery.ts";
import { FullscreenLoader } from "@/shared/ui";
import { AuthProvider } from "@/modules/auth";
import { ApolloErrorDisplay } from "@/shared/lib/graphql";
import { NetworkStatus } from "@apollo/client";

const App = () => {
  const queries = {
    me: useGetMeQuery(),
  };
  const mutations = {
    startSession: useStartSessionMutation(),
  };

  useEffect(() => {
    const initSession = async () => {
      sessionStorage.removeItem("sessionToken");

      await mutations.startSession.mutate({
        onCompleted(data) {
          const sessionToken = data.startSession.sessionToken;

          sessionStorage.setItem("sessionToken", sessionToken);
        },
      });
    };
    initSession();
  }, []);

  if (queries.me.loading || mutations.startSession.loading) {
    return <FullscreenLoader />;
  }

  if (queries.me.error) {
    return (
      <div>
        <ApolloErrorDisplay error={queries.me.error} />
        <ApolloErrorDisplay error={mutations.startSession.error} />
      </div>
    );
  }

  if (queries.me.networkStatus === NetworkStatus.ready && mutations.startSession.called) {
    return (
      <AuthProvider userId={queries.me.data?.me.id || null}>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  }

  return null;
};

export default App;
