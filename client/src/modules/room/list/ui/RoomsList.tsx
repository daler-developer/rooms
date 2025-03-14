import { useMemo, useState } from "react";
import { NetworkStatus } from "@apollo/client";
import { Empty, Input, Scroll } from "@/shared/ui";
import useExcludedFromRoomSub from "../gql/useExcludedFromRoomSub.ts";
import useRoomCreatedSub from "../gql/useRoomCreatedSub.ts";
import RoomsListItem from "./rooms-list-item/RoomsListItem.tsx";
import useGetRoomsQuery from "../gql/useGetRoomsQuery.ts";
import RoomsListSkeletons from "./RoomsListSkeletons.tsx";
import { CreateRoomButton } from "@/modules/room/create";

const RoomsList = () => {
  const [search, setSearch] = useState("");

  const isSearchEmpty = search === "";

  const queries = {
    rooms: useGetRoomsQuery(),
  };

  useExcludedFromRoomSub();
  useRoomCreatedSub();

  const filteredRooms = useMemo(() => {
    if (queries.rooms.networkStatus !== NetworkStatus.ready) {
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
    return [NetworkStatus.loading].includes(queries.rooms.networkStatus);
  }, [queries.rooms.networkStatus]);

  const showRoomsList = useMemo(() => {
    return [NetworkStatus.ready].includes(queries.rooms.networkStatus);
  }, [queries.rooms.networkStatus]);

  const showEmptyState = useMemo(() => {
    return [NetworkStatus.ready].includes(queries.rooms.networkStatus) && queries.rooms.data!.rooms.length === 0;
  }, [queries.rooms.networkStatus, queries.rooms.data]);

  const showCreateRoomButton = useMemo(() => {
    return queries.rooms.networkStatus !== NetworkStatus.loading;
  }, [queries.rooms.networkStatus]);

  const showNoSearchResults = useMemo(() => {
    return [NetworkStatus.ready].includes(queries.rooms.networkStatus) && !isSearchEmpty && filteredRooms.length === 0;
  }, [queries.rooms.networkStatus, filteredRooms]);

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
                  <RoomsListItem key={room.id} room={room} />
                ))}
              </Scroll>
            ) : (
              <div className="mt-4">
                <Empty title="No Results" />
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
