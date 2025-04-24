import { useCustomSearchParam } from "@/shared/lib/router";

const useRoomIdSearchParam = () => {
  const { value: roomId, set: setRoomId, remove: removeRoomId } = useCustomSearchParam<number, null>("roomId", Number, null);

  return {
    roomId,
    setRoomId,
    removeRoomId,
  };
};

export default useRoomIdSearchParam;
