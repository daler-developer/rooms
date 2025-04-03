import { useSearchParams } from "react-router-dom";
import { RoomChat } from "@/modules/room/chat";
import Sidebar from "./sidebar/Sidebar.tsx";
import { HiOutlineChat } from "react-icons/hi";
import useNewInvitationSub from "../gql/useNewInvitationSub.ts";
import useUserRejectedInvitationSub from "../gql/useUserRejectedInvitationSub.ts";
import useUserAcceptedInvitationSub from "../gql/useUserAcceptedInvitationSub.ts";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const roomId = Number(searchParams.get("roomId")) || null;

  useNewInvitationSub();
  useUserRejectedInvitationSub();
  useUserAcceptedInvitationSub();

  const handleRoomChatClose = () => {
    searchParams.delete("roomId");
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Sidebar />
      <div className="ml-[400px]">
        <div className="h-screen">
          {roomId ? (
            <RoomChat key={roomId!} roomId={roomId!} onClose={handleRoomChatClose} />
          ) : (
            <div className="h-full flex items-center justify-center p-4">
              <div className="flex flex-col items-center justify-center">
                <HiOutlineChat className="text-6xl text-gray-400 mb-4" />
                <p className="text-xl text-gray-500">Open room to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
