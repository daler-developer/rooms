import { useEffect } from "react";

import { useQuery } from "@apollo/client";

import { GET_USERS } from "../gql";

import UserCard from "./UserCard.tsx";

const UsersList = () => {
  const getUsersQuery = useQuery(GET_USERS);

  // useEffect(() => {
  //   console.log("getUsersQuery", getUsersQuery.data);
  // });

  if (getUsersQuery.loading) {
    return "loading";
  }

  return (
    <div>
      {getUsersQuery.data!.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
