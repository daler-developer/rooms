import { RouterProvider } from "react-router-dom";
import router from "@/app/router.tsx";
import { useSubscribeToMeInvitedToRoom } from "@/features/subscribe/me-invited-to-room";
import { useSubscribeToRepliedToMyInvitation } from "@/features/subscribe/replied-to-my-invitation";
import { useCustomMutation } from "@/shared/lib/graphql";
import { START_SESSION } from "./gql";
import { useEffect } from "react";

const App = () => {
  const mutations = {
    startSession: useCustomMutation(START_SESSION),
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
  // useSubscribeToMeInvitedToRoom();
  // useSubscribeToRepliedToMyInvitation();

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
