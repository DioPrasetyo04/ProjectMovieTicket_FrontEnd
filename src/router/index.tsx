import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./admin/adminRoutes";
import customerRoutes from "./customer/customerRoutes";

const router = createBrowserRouter([...adminRoutes, ...customerRoutes]);

export default router;
