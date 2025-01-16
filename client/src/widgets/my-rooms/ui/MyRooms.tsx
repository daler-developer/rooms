import { NetworkStatus, useQuery, useSubscription } from "@apollo/client";
import { Input, Select, Spinner, Button } from "@/shared/ui";

import { useCustomSearchParams } from "@/shared/lib/router";

import RoomCard from "./RoomCard/RoomCard.tsx";

import { GET_MY_ROOMS } from "../gql/tags.ts";

import { useDebouncedFn, useDebouncedValue, usePageScroll } from "@/shared/hooks";
import { useEffect, useState } from "react";
import Tooltip from "@/shared/ui/components/Tooltip/Tooltip.tsx";
import { ME_IS_EXCLUDED_FROM_ROOM } from "../gql/tags.ts";

type SortType = "CREATED_AT_ASC" | "CREATED_AT_DESC" | "JOINED_AT_ASC" | "JOINED_AT_DESC";

const filterOptions: Array<{ label: string; value: SortType }> = [
  {
    label: "Date created (asc)",
    value: "CREATED_AT_ASC",
  },
  {
    label: "Date created (desc)",
    value: "CREATED_AT_DESC",
  },
  {
    label: "Date joined (asc)",
    value: "JOINED_AT_ASC",
  },
  {
    label: "Date joined (desc)",
    value: "JOINED_AT_DESC",
  },
];

const MyRooms = () => {
  const [search, setSearch] = useState("");

  useSubscription(ME_IS_EXCLUDED_FROM_ROOM, {
    onData({ data, client }) {
      client.cache.evict({ id: client.cache.identify({ id: data.data!.meIsExcludedFromRoom.id, __typename: "Room" }) });
    },
  });

  const myRoomsQuery = useQuery(GET_MY_ROOMS, {
    variables: {
      input: {
        offset: 0,
        limit: 10,
        search: "",
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [lastExecutedFetchResult, setLastExecutedFetchResult] = useState<(typeof myRoomsQuery)["data"] | null>(null);

  const lastResponseWithNoResults = lastExecutedFetchResult?.me.rooms.length === 0;

  const isLoading = myRoomsQuery.networkStatus === NetworkStatus.loading;
  const isFetchingMore = myRoomsQuery.networkStatus === NetworkStatus.fetchMore;
  const isRefetching = myRoomsQuery.networkStatus === NetworkStatus.refetch;

  const handleLoadMore = async () => {
    const { data } = await myRoomsQuery.fetchMore({
      variables: {
        input: {
          ...myRoomsQuery.variables?.input,
          offset: myRoomsQuery.data?.me.rooms.length,
        },
      },
    });

    setLastExecutedFetchResult(data);
  };

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
        {!isRefetching && !isLoading && !isFetchingMore && lastResponseWithNoResults && (
          <div className="text-center">
            <span>No results</span>
            <button type="button" onClick={handleLoadMore}>
              Load
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRooms;

/*

        <div className="col-span-4">
          <Select options={filterOptions} value={searchParams.sortBy} onChange={handleSortByChange} />
        </div>
        <div className="col-span-3">
          <Button type="button" fullWidth onClick={handleReset}>
            Reset
          </Button>
        </div>
 */
