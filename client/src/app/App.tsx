import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/app/router.tsx";
import useStartSessionMutation from "./gql/useStartSessionMutation.ts";

const App = () => {
  const mutations = {
    startSession: useStartSessionMutation(),
  };

  useEffect(() => {
    const startSession = async () => {
      await mutations.startSession.mutate({
        onCompleted(data) {
          const sessionToken = data.startSession.sessionToken;

          sessionStorage.setItem("sessionToken", sessionToken);
        },
      });
    };

    const hasSessionToken = Boolean(sessionStorage.getItem("sessionToken"));

    if (!hasSessionToken) {
      startSession();
    }
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
