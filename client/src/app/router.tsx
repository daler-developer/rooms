import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/lib/router";
import ProtectedRoute from "./ProtectedRoute.tsx";

import { LoginPage } from "@/pages/login";
import { HomePage } from "@/pages/home";
import { Register } from "@/pages/register";

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATH.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTE_PATH.HOME,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_PATH.HOME} replace />,
  },
]);

export default router;
