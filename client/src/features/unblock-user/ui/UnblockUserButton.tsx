import { User } from "@/__generated__/graphql.ts";
import { Button } from "@/shared/ui";
import { useMutation } from "@apollo/client";

import { UNBLOCK_USER } from "../gql";

type Props = {
  userId: User["id"];
};

const UnblockUserButton = ({ userId }: Props) => {
  const [unblockUser, { loading: isUnblocking }] = useMutation(UNBLOCK_USER);

  const handleClick = () => {
    unblockUser({
      variables: { input: { userId } },
    });
  };

  return (
    <Button type="button" color="red" isLoading={isUnblocking} onClick={handleClick}>
      Unblock
    </Button>
  );
};

export default UnblockUserButton;
