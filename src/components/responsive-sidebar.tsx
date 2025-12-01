import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

const ResponsiveSidebar = () => {
  return (
    <nav className="grid gap-2 text-lg font-medium px-5 ">
      <Link
        to="#"
        className="flex items-center gap-2 text-lg font-semibold py-5 px-5"
      >
        <Package2 className="h-6 w-6" />
        <span className="">Bioskop CMS</span>
      </Link>
      <Link
        to="/admin"
        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
      >
        <Home className="h-5 w-5" />
        Dashboard
      </Link>
      <Link
        to="/admin/genres"
        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
      >
        <Package className="h-5 w-5" />
        Genre
      </Link>
    </nav>
  );
};

export default ResponsiveSidebar;
