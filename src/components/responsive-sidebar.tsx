import {
  Clapperboard,
  DollarSign,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Theater,
  User,
  Users,
  Wallet,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

const ResponsiveSidebar = () => {
  return (
    <nav className="grid gap-2 text-lg font-medium px-5 ">
      <Link
        to="/admin"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        to="/admin/genres"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Package className="h-4 w-4" />
        Genre
      </Link>
      <Link
        to={"/admin/theaters"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Theater className="h-4 w-4" />
        Theaters
      </Link>
      <Link
        to={"/admin/movies"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Clapperboard className="h-4 w-4" />
        Movies
      </Link>
      <Link
        to={"/admin/customers"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <User className="h-4 w-4"></User>
        Customers
      </Link>
      <Link
        to={"/admin/transactions"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <DollarSign className="h-4 w-4"></DollarSign>
        Transactions
      </Link>
      <Link
        to={"/admin/wallet-transactions"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Wallet className="h-4 w-4"></Wallet>
        Wallet Transactions
      </Link>
    </nav>
  );
};

export default ResponsiveSidebar;
