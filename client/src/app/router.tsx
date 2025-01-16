import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";

import { LoginPage } from "@/pages/login";
import { HomePage } from "@/pages/home";
import { Register } from "@/pages/register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
