import { useEffect, useLayoutEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { NetworkStatus, useLazyQuery, useQuery } from "@apollo/client";
import { HiHome, HiMiniUserCircle, HiMiniUsers } from "react-icons/hi2";

import { FullscreenLoader, useToast } from "@/shared/ui";

import { GET_ME } from "@/entities/user";
import { Sidebar } from "@/shared/ui";
import { MyRooms } from "@/widgets/my-rooms";
import { CreateRoomButton } from "@/features/create-room";

const MainLayout = () => {
  const [getMe, { loading, error, data, called }] = useLazyQuery(GET_ME, {
    notifyOnNetworkStatusChange: true,
    onError() {
      localStorage.removeItem("token");
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getMe();
    } else {
      navigate("/login");
    }
  }, []);

  if (loading || !called) {
    return <FullscreenLoader />;
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="fixed top-0 left-0 bottom-0 w-[400px] border">
        {data?.me.email}
        <MyRooms />

        <div className="absolute bottom-4 right-4">
          <CreateRoomButton />
        </div>
      </div>
      <div className="ml-[400px]">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

/*

<Sidebar
          userInfo={{
            img: data!.me.profilePictureUrl || undefined,
            title: data!.me.email,
            subTitle: data!.me.password,
          }}
          items={[
            {
              text: "Home",
              Icon: HiHome,
              to: "/",
            },
            {
              text: "Profile",
              Icon: HiMiniUserCircle,
              to: "/profile",
            },
            {
              text: "Users",
              Icon: HiMiniUsers,
              to: "/users",
            },
            {
              text: "New Room",
              Icon: HiMiniUsers,
              to: "/new-room",
            },
            {
              text: "My invitations " + data!.me.invitationsCount,
              Icon: HiMiniUsers,
              to: "/me/invitations",
            },
          ]}
        />
 */
