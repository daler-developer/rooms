import { useMemo, useState } from "react";
import { Empty, Input, Scroll } from "@/shared/ui";
import useExcludedFromRoomSub from "../gql/useExcludedFromRoomSub.ts";
import useNewRoomSub from "../gql/useNewRoomSub.ts";
import RoomsListItem from "./rooms-list-item/RoomsListItem.tsx";
import useGetRoomsQuery from "../gql/useGetRoomsQuery.ts";
import RoomsListSkeletons from "./RoomsListSkeletons.tsx";
import { CreateRoomButton } from "@/modules/room/create";

type Props = {
  selectedRoomId: number | null;
  onSelectedRoomIdChange: (selectedRoomId: number) => void;
};

const RoomsList = ({ selectedRoomId, onSelectedRoomIdChange }: Props) => {
  const [search, setSearch] = useState("");

  const queries = {
    rooms: useGetRoomsQuery(),
  };

  useExcludedFromRoomSub();
  useNewRoomSub();

  const filteredRooms = useMemo(() => {
    if (!queries.rooms.data) {
      return [];
    }

    return [
      ...queries.rooms.data!.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.rooms.filter((room) => room.name.includes(search.trim())),
    ];
  }, [search, queries.rooms.data, queries.rooms.networkStatus]);

  const showSkeletons = useMemo(() => {
    return !queries.rooms.data;
  }, [queries.rooms.networkStatus, queries.rooms.data]);

  const showRoomsList = useMemo(() => {
    return queries.rooms.data && queries.rooms.data.rooms.length > 0;
  }, [queries.rooms.networkStatus, queries.rooms.data]);

  const showEmptyState = useMemo(() => {
    return queries.rooms.data && queries.rooms.data.rooms.length === 0;
  }, [queries.rooms.networkStatus, queries.rooms.data]);

  const showCreateRoomButton = useMemo(() => {
    return queries.rooms.data;
  }, [queries.rooms.data]);

  return (
    <div className="relative h-full overflow-hidden">
      {showSkeletons && <RoomsListSkeletons />}

      {showEmptyState && (
        <div className="h-full flex items-center justify-center">
          <Empty title="No rooms" />
        </div>
      )}

      {showRoomsList && (
        <div className="pt-2 flex flex-col h-full">
          <div className="px-1">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="flex-grow shrink-0 overflow-hidden">
            {filteredRooms.length > 0 ? (
              <Scroll height="full" className="mt-2 flex flex-col px-1">
                {filteredRooms.map((room) => (
                  <RoomsListItem
                    key={room.id}
                    room={room}
                    isSelected={selectedRoomId === room.id}
                    onClick={() => {
                      onSelectedRoomIdChange(room.id);
                    }}
                  />
                ))}
              </Scroll>
            ) : (
              <div className="h-full flex items-center justify-center">
                <Empty title="No results" />
              </div>
            )}
          </div>
        </div>
      )}

      {showCreateRoomButton && (
        <div className="absolute bottom-4 right-4">
          <CreateRoomButton />
        </div>
      )}
    </div>
  );
};

export default RoomsList;
