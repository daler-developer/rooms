import { createContext, ReactNode, useContext } from "react";

type Context = {
  userId: number;
};

const AuthContext = createContext<Context>(null!);

export const AuthProvider = ({ children, userId }: { children: ReactNode; userId: number }) => {
  return <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
