import { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_ME_BLOCKED_STATUS } from "../";

const subscribeToMeBlocked = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    }
  }, []);

  useSubscription(SUBSCRIBE_TO_ME_BLOCKED_STATUS, {
    onData({ data }) {
      if (data.data?.meIsBlockedStatus.isBlocked) {
        alert("You are blocked");

        localStorage.removeItem("token");
        window.location.reload();
      }
    },
    skip: !hasToken,
  });
};

export default subscribeToMeBlocked;
