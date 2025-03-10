import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/app/router.tsx";
import useStartSessionMutation from "./gql/useStartSessionMutation.ts";
import useGetMeQuery from "./gql/useGetMeQuery.ts";
import { FullscreenLoader } from "@/shared/ui";
import { AuthProvider } from "@/modules/auth";
import { ApolloErrorDisplay } from "@/shared/lib/graphql";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  const queries = {
    me: useGetMeQuery(),
  };
  const mutations = {
    startSession: useStartSessionMutation(),
  };

  useEffect(() => {
    const initSession = async () => {
      try {
        sessionStorage.removeItem("sessionToken");

        await mutations.startSession.mutate({
          onCompleted(data) {
            const sessionToken = data.startSession.sessionToken;

            sessionStorage.setItem("sessionToken", sessionToken);
          },
        });
        const authToken = localStorage.getItem("token");
        if (authToken) {
          await queries.me.fetch();
        }
      } finally {
        setShowLoader(false);
      }
    };
    initSession();
  }, []);

  if (showLoader) {
    return <FullscreenLoader />;
  }

  if (queries.me.error || mutations.startSession.error) {
    return (
      <div>
        temp
        <ApolloErrorDisplay error={queries.me.error} />
        <ApolloErrorDisplay error={mutations.startSession.error} />
      </div>
    );
  }

  return (
    <AuthProvider userId={queries.me.data?.me.id || null}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
