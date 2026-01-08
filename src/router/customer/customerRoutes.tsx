import CustomerSignUp from "@/pages/CustomerSignUp";
import type { RouteObject } from "react-router-dom";

const customerRoutes: RouteObject[] = [
  {
    path: "/sign-up",
    element: <CustomerSignUp></CustomerSignUp>,
  },
];

export default customerRoutes;
