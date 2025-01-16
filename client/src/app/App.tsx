import { RouterProvider } from "react-router-dom";
import router from "@/app/router.tsx";
import { useSubscribeToMeInvitedToRoom } from "@/features/subscribe/me-invited-to-room";
import { useSubscribeToRepliedToMyInvitation } from "@/features/subscribe/replied-to-my-invitation";

const App = () => {
  useSubscribeToMeInvitedToRoom();
  useSubscribeToRepliedToMyInvitation();

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
