import { getSession } from "@/lib/utils";
import CustomerHome from "@/pages/CustomerHome";
import CustomerSignIn from "@/pages/CustomerSignIn";
import CustomerSignUp from "@/pages/CustomerSignUp";
import { redirect, type RouteObject } from "react-router-dom";

const customerRoutes: RouteObject[] = [
  {
    path: "/sign-up",
    element: <CustomerSignUp></CustomerSignUp>,
  },
  {
    path: "/sign-in",
    element: <CustomerSignIn></CustomerSignIn>,
  },
  {
    path: "/",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerHome></CustomerHome>,
  },
];

export default customerRoutes;
