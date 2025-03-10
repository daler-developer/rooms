import { createContext, ReactNode, useContext } from "react";

type Context = {
  userId: number | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<Context>(null!);

export const AuthProvider = ({ children, userId }: { children: ReactNode; userId: Context["userId"] }) => {
  return <AuthContext.Provider value={{ userId, isAuthenticated: Boolean(userId) }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
