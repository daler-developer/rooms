import { NetworkStatus, useQuery, useSubscription } from "@apollo/client";
import { Input, Spinner } from "@/shared/ui";

import RoomCard from "./RoomCard/RoomCard.tsx";

import { GET_MY_ROOMS } from "../gql/tags.ts";

import { useState } from "react";
import { ME_IS_EXCLUDED_FROM_ROOM } from "../gql/tags.ts";

const MyRooms = () => {
  const [search, setSearch] = useState("");

  useSubscription(ME_IS_EXCLUDED_FROM_ROOM, {
    onData({ data, client }) {
      client.cache.evict({ id: client.cache.identify({ id: data.data!.meIsExcludedFromRoom.id, __typename: "Room" }) });
    },
  });

  const myRoomsQuery = useQuery(GET_MY_ROOMS, { notifyOnNetworkStatusChange: true });

  const isLoading = myRoomsQuery.networkStatus === NetworkStatus.loading;
  const isFetchingMore = myRoomsQuery.networkStatus === NetworkStatus.fetchMore;
  const isRefetching = myRoomsQuery.networkStatus === NetworkStatus.refetch;

  return (
    <div className="relative h-full pt-2">
      <div className="px-1">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {myRoomsQuery.data && (
        <div className="mt-2 flex flex-col">
          {myRoomsQuery.data.me.rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      <div className="mt-4 h-[100px]">
        {(isRefetching || isLoading || isFetchingMore) && (
          <div className="flex justify-between">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRooms;
