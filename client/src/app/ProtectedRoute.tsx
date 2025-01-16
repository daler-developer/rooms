import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "@/modules/auth";
import { GET_ME } from "./gql";
import { useCustomLazyQuery } from "@/shared/lib/graphql";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const queries = {
    me: useCustomLazyQuery(GET_ME),
  };

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          await queries.me.fetch();

          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return <AuthProvider userId={queries.me.data!.me.id}>{children}</AuthProvider>;
  }

  return null;
};

export default ProtectedRoute;
