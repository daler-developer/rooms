import { Modal, Tabs } from "@/shared/ui";
import { GET_ROOM_PARTICIPANTS_QUERY, USERS_ONLINE_STATUS_CHANGE } from "../../gql/tags.ts";
import { NetworkStatus, useSubscription } from "@apollo/client";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import RoomParticipant from "@/widgets/room-chat/ui/RoomInfo/RoomParticipant.tsx";
import { useCustomLazyQuery } from "@/shared/lib/graphql";

export type RoomInfoModalHandler = {
  open: () => void;
};

type Tab = "participants" | "settings";

const RoomInfoModal = forwardRef<RoomInfoModalHandler>((_, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<Tab>("participants");

  const { roomId } = useRoomChatStore();

  const queries = {
    participants: useCustomLazyQuery(GET_ROOM_PARTICIPANTS_QUERY, {
      notifyOnNetworkStatusChange: true,
      variables: {
        id: roomId,
      },
    }),
  };

  const userIds = useMemo(() => {
    if (queries.participants.networkStatus === NetworkStatus.ready && queries.participants.data) {
      return queries.participants.data?.room.participants.map((p) => p.id) || [];
    }

    return [];
  }, [queries.participants.networkStatus, queries.participants.data]);

  useSubscription(USERS_ONLINE_STATUS_CHANGE, {
    variables: {
      userIds,
    },
    skip: userIds.length === 0,
  });

  useImperativeHandle(ref, () => ({
    open() {
      queries.participants.fetch();
      setShowModal(true);
    },
  }));

  const showSkeletons = useMemo(() => {
    return queries.participants.networkStatus === NetworkStatus.loading;
  }, [queries.participants.networkStatus]);

  const showParticipantsList = useMemo(() => {
    return queries.participants.networkStatus === NetworkStatus.ready && queries.participants.networkStatus;
  }, [queries.participants.networkStatus]);

  return (
    <Modal title="Room Info" isOpen={showModal} onClose={() => setShowModal(false)}>
      <div>
        <Tabs
          items={[
            {
              title: "Participants",
              value: "participants",
            },
            {
              title: "Settings",
              value: "settings",
            },
          ]}
          value={tab}
          onChange={(to) => setTab(to as Tab)}
        />

        <div className="mt-4">
          {showSkeletons && <div></div>}

          {showParticipantsList && (
            <div>
              <ul className="flex flex-col gap-2">
                {queries.participants.data?.room.participants.map((participant) => <RoomParticipant key={participant.id} participant={participant} />)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
});

export default RoomInfoModal;
