import { NetworkStatus, useSubscription } from "@apollo/client";
import { Empty, Input } from "@/shared/ui";
import RoomCard from "./RoomCard/RoomCard.tsx";
import { ME_IS_EXCLUDED_FROM_ROOM } from "../gql/tags.ts";
import useGetRoomsQuery from "../gql/useGetRoomsQuery.ts";

import { useMemo, useState } from "react";
import RoomsListSkeletons from "@/widgets/my-rooms/ui/RoomsListSkeletons.tsx";
import Scroll from "@/shared/ui/components/ScrollV2/Scroll.tsx";
import { CreateRoomButton } from "@/modules/room/create";

const MyRooms = () => {
  const [search, setSearch] = useState("");

  useSubscription(ME_IS_EXCLUDED_FROM_ROOM, {
    onData({ data, client }) {
      client.cache.evict({ id: client.cache.identify({ id: data.data!.meIsExcludedFromRoom.id, __typename: "Room" }) });
    },
  });

  const queries = {
    rooms: useGetRoomsQuery(),
  };

  const filteredRooms = useMemo(() => {
    if (queries.rooms.networkStatus !== NetworkStatus.ready) {
      return [];
    }

    return [
      ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
      // ...queries.rooms.data!.me.rooms.filter((room) => room.name.includes(search.trim())),
    ];
  }, [search, queries.rooms.data, queries.rooms.networkStatus]);

  const showSkeletons = useMemo(() => {
    return queries.rooms.networkStatus === NetworkStatus.loading;
  }, [queries.rooms.networkStatus]);

  const showRoomsList = useMemo(() => {
    return queries.rooms.networkStatus === NetworkStatus.ready;
  }, [queries.rooms.networkStatus]);

  const showEmptyState = useMemo(() => {
    return queries.rooms.networkStatus === NetworkStatus.ready && queries.rooms.data!.me.rooms.length === 0;
  }, [queries.rooms.networkStatus, queries.rooms.data]);

  const showCreateRoomButton = useMemo(() => {
    return queries.rooms.networkStatus !== NetworkStatus.loading;
  }, [queries.rooms.networkStatus]);

  const showNoSearchResults = useMemo(() => {
    return queries.rooms.networkStatus === NetworkStatus.ready && filteredRooms.length === 0;
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

          <div className="flex-grow shrink-0 overflow-scroll">
            {filteredRooms.length > 0 ? (
              <Scroll height="full" showScrollToBottomButton={false}>
                <div className="mt-2 flex flex-col">
                  {filteredRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              </Scroll>
            ) : (
              <Empty title="No Results" />
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

export default MyRooms;
