import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./admin/adminRoutes";

const router = createBrowserRouter([...adminRoutes]);

export default router;
