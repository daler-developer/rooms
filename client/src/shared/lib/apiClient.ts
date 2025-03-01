import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
