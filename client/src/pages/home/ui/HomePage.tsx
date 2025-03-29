import { useSearchParams } from "react-router-dom";
import { RoomChat } from "@/modules/room/chat";
import Sidebar from "./sidebar/Sidebar.tsx";
import { HiOutlineChat } from "react-icons/hi";
import useNewInvitationSub from "../gql/useNewInvitationSub.ts";
import useUserRejectedInvitationSub from "../gql/useUserRejectedInvitationSub.ts";
import useUserAcceptedInvitationSub from "../gql/useUserAcceptedInvitationSub.ts";
import { Avatar, Badge } from "@/shared/ui";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const roomId = Number(searchParams.get("roomId")) || null;

  useNewInvitationSub();
  useUserRejectedInvitationSub();
  useUserAcceptedInvitationSub();

  const handleRoomLeave = () => {
    searchParams.delete("roomId");
    setSearchParams(searchParams);
  };

  // return (
  //   <div className="p-4 flex gap-4">
  //     <Avatar size="xs" badgeContent={<Badge badgeColor={"green"} size={"sm"} />} alt="A" />
  //     <Avatar size="sm" badgeContent={<Badge badgeColor={"green"} size={"md"} />} alt="A" />
  //     <Avatar size="md" badgeContent={<Badge badgeColor={"green"} size={"md"} />} alt="A" />
  //     <Avatar size="lg" badgeContent={<Badge badgeColor={"green"} size={"md"} />} alt="A" />
  //     <Avatar size="xl" badgeContent={<Badge badgeColor={"green"} size={"md"} />} alt="A" />
  //   </div>
  // );

  return (
    <div>
      <Sidebar />
      <div className="ml-[400px]">
        <div className="h-screen">
          {roomId ? (
            <RoomChat roomId={roomId!} onLeave={handleRoomLeave} />
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
