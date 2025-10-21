import type { RouteObject } from "react-router-dom";
import Login from "../../pages/admin/auth/Login";
import Dashboard from "../../pages/admin/Dashboard";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <Login></Login>,
  },
  {
    path: "/admin",
    element: <Dashboard></Dashboard>,
  },
];

export default adminRoutes;
