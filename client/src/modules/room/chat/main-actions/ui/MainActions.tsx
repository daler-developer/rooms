import { useRef, useState } from "react";
import useLeaveRoomMutation from "../gql/useLeaveRoomMutation.ts";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { Dropdown, IconButton } from "@/shared/ui";
import { useRoomId } from "../../context";
import { InviteUsersToRoomModal, type RoomInviteMembersModalHandler } from "@/modules/invitation/invite-users-to-room";
import MainActionsConfirmLeave from "./MainActionsConfirmLeave.tsx";
import { useRoomChatEmitter } from "../../emitter.ts";

const MainActions = () => {
  const [showConfirmLeaveModal, setShowConfirmLeaveModal] = useState(false);

  const emitter = useRoomChatEmitter();

  const roomId = useRoomId();

  const roomInviteMembersModalComp = useRef<RoomInviteMembersModalHandler>(null!);

  const mutations = {
    leaveRoom: useLeaveRoomMutation(),
  };

  const handleConfirmLeave = async () => {
    emitter.emit("ROOM_LEAVE");
    await mutations.leaveRoom.mutate({
      variables: {
        input: {
          roomId,
        },
      },
    });
  };

  const handleInvite = async () => {
    await roomInviteMembersModalComp.current.open({
      roomId,
    });
  };

  return (
    <>
      <Dropdown
        placement="bottom-right"
        trigger={
          <div>
            <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
          </div>
        }
        items={[
          {
            label: "Invite",
            onClick: handleInvite,
          },
          {
            label: "Leave",
            onClick: () => {
              setShowConfirmLeaveModal(true);
            },
          },
        ]}
      />

      <MainActionsConfirmLeave isOpen={showConfirmLeaveModal} onClose={() => setShowConfirmLeaveModal(false)} onConfirm={handleConfirmLeave} />
      <InviteUsersToRoomModal ref={roomInviteMembersModalComp} />
    </>
  );
};

export default MainActions;
