import { Modal, Scroll } from "@/shared/ui";
import { GET_ROOM_PARTICIPANTS_QUERY, USERS_ONLINE_STATUS_CHANGE, EXCLUDE_USER_FROM_ROOM } from "../../gql/tags.ts";
import { UserCard } from "@/entities/user";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Dropdown from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import IconButton from "../../../../shared/ui/components/IconButton/IconButton.tsx";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import RoomParticipant from "@/widgets/room-chat/ui/RoomInfo/RoomParticipant.tsx";

export type RoomInfoModalHandler = {
  open: () => void;
};

const RoomInfoModal = forwardRef<RoomInfoModalHandler>((_, ref) => {
  const [showModal, setShowModal] = useState(false);

  const { roomId } = useRoomChatStore();

  const [fetchRoomParticipants, { loading: isFetchingRoomParticipants, data: fetchParticipantsData }] = useLazyQuery(GET_ROOM_PARTICIPANTS_QUERY, {
    variables: {
      id: roomId,
    },
  });

  const userIds = fetchParticipantsData?.room.participants.map((p) => p.id) || [];

  useSubscription(USERS_ONLINE_STATUS_CHANGE, {
    variables: {
      userIds,
    },
    skip: userIds.length === 0,
  });

  useImperativeHandle(ref, () => ({
    open() {
      fetchRoomParticipants();
      setShowModal(true);
    },
  }));

  return (
    <Modal title="Room Info" isOpen={showModal} onClose={() => setShowModal(false)}>
      <ul className="flex flex-col gap-2">
        {fetchParticipantsData &&
          fetchParticipantsData.room.participants.map((participant) => <RoomParticipant key={participant.key} participant={participant} />)}
      </ul>
    </Modal>
  );
});

export default RoomInfoModal;
