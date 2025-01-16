import { User } from "../model/types";
import { apiClient } from "../lib";

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

type GetMeResponesData = {
  user: User;
};

export const getMe = () => {
  return apiClient.get<GetMeResponesData>("/api/auth/profile");
};
