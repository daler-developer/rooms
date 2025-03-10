import { ReactNode, useLayoutEffect } from "react";
import { useAuth } from "@/modules/auth";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  if (isAuthenticated) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
