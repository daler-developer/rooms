import { User } from "@/__generated__/graphql.ts";
import { Button } from "@/shared/ui";
import { useMutation } from "@apollo/client";

import { BLOCK_USER } from "../gql";

type Props = {
  userId: User["id"];
};

const BlockUserButton = ({ userId }: Props) => {
  const [blockUser, { loading: isBlocking }] = useMutation(BLOCK_USER);

  const handleClick = () => {
    blockUser({
      variables: { input: { userId } },
    });
  };

  return (
    <Button type="button" color="red" isLoading={isBlocking} onClick={handleClick}>
      Block
    </Button>
  );
};

export default BlockUserButton;
