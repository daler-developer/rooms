import { User } from "../../../shared";
import { apiClient } from "../../../shared/lib";

type LoginServiceBody = {
  username: string;
  password: string;
};

type LoginSerivceResponseData = {
  user: User;
  token: string;
};

export const login = (body: LoginServiceBody) => {
  return apiClient.post<LoginSerivceResponseData>("/api/auth/login", body);
};
