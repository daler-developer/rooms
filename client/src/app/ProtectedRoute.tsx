import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
