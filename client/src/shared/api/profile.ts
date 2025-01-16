import { FriendshipRequest } from "../model/types";
import { apiClient } from "../lib";

type GetFriendshipRequestsParams = {
  offset: number;
};

type GetFriendshipRequestsResponseData = {
  friendship_requests: FriendshipRequest[];
};

export const getFriendshipRequests = async (
  params: GetFriendshipRequestsParams,
) => {
  return apiClient
    .get<GetFriendshipRequestsResponseData>(
      "/api/profile/friendship-requests",
      {
        params,
      },
    )
    .then((response) => {
      return {
        ...response,
        data: {
          ...response.data,
          friendship_requests: response.data.friendship_requests.map(
            (friendshipRequest) => ({
              ...friendshipRequest,
              id: friendshipRequest.user.id,
            }),
          ),
        },
      };
    });
};

type ResetPasswordBody = {
  old_password: string;
  new_password: string;
  new_password_repeat: string;
};

type ResetPasswordResponeData = {
  message: string;
};

export const resetPassword = (body: ResetPasswordBody) => {
  return apiClient.post<ResetPasswordResponeData>(
    `/api/profile/reset-password`,
    body,
  );
};

type AcceptFriendshipRequestResponeData = {
  message: string;
};

export const acceptFriendshipRequest = (userId: number) => {
  return apiClient.post<AcceptFriendshipRequestResponeData>(
    `/api/users/${userId}/accept-friendship-request`,
  );
};

type RejectFriendshipRequestResponeData = {
  message: string;
};

export const rejectFriendshipRequest = (userId: number) => {
  return apiClient.post<RejectFriendshipRequestResponeData>(
    `/api/users/${userId}/reject-friendship-request`,
  );
};
