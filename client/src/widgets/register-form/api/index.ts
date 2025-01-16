import { apiClient } from "../../../shared/lib";

type CheckUsernameResponseData = {
  exists: boolean;
};

export const checkUsernameExists = (username: string) => {
  return apiClient.post<CheckUsernameResponseData>("/api/auth/check-username", {
    username,
  });
};
