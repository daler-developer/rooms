import { ReactNode, useEffect } from "react";
import { useAuth } from "@/modules/auth";
import { useNavigate } from "react-router-dom";
import { buildRoutePath } from "@/shared/lib/router";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(buildRoutePath.LOGIN());
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return children;
  }

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default ProtectedRoute;
