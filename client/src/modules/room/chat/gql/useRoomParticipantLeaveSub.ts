import { useSubscription } from "@apollo/client";
import { useAuth } from "@/modules/auth";
import { useRoomChatEmitter } from "../emitter";
import { useRoomId } from "../context";

const useRoomParticipantLeaveSub = () => {
  // const roomId = useRoomId();
  // const { userId } = useAuth();
  // const emitter = useRoomChatEmittr();
  //
  // return useSubscription(ROOM_PARTICIPANT_LEAVE_SUB, {
  //   variables: {
  //     roomId,
  //   },
  //   onData({ data }) {
  //     if (!data.data) return;
  //
  //     const isMe = data.data.roomParticipantLeave.id === userId;
  //     if (isMe) {
  //       emitter.emit("ROOM_LEAVE");
  //     }
  //   },
  // });
};

export default useRoomParticipantLeaveSub;
