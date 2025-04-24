import { buildRoutePath } from "@/shared/lib/router";

const useLogout = () => {
  return () => {
    localStorage.removeItem("token");
    location.href = buildRoutePath.LOGIN();
  };
};

export default useLogout;
