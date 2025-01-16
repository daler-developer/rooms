import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
};

export default useLogout;
