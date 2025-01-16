import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { RoomChat } from "@/widgets/room-chat";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "@/entities/user";
import { useEffect, useState } from "react";
import { FullscreenLoader } from "@/shared/ui";
import Sidebar from "./sidebar/Sidebar.tsx";

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const roomId = Number(searchParams.get("roomId")) || null;

  const [getMe, { loading, error, data, called }] = useLazyQuery(GET_ME, {
    notifyOnNetworkStatusChange: true,
    onError() {
      localStorage.removeItem("token");
    },
  });

  useEffect(() => {
    getMe();
  }, []);

  if (loading || !called) {
    return <FullscreenLoader />;
  }

  return (
    <div>
      <Sidebar />
      <div className="ml-[400px]">
        <div className="h-screen">{roomId ? <RoomChat roomId={roomId!} /> : <div>No room id</div>}</div>
      </div>
    </div>
  );
};

export default HomePage;
