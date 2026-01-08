import { Bell, Package2 } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import Sidebar from "./sidebar";
import Header from "./header";
import { Toaster } from "./ui/sonner";
import Allert from "./ui/Allert";
import { useAllert } from "@/context/AllertContext";

import "../shadcn.css";

const AdminLayout = () => {
  const { allert, setAllert } = useAllert();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Bioskop CMS</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <Sidebar></Sidebar>
        </div>
      </div>
      <div className="flex flex-col">
        <Header></Header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-6">
          <Outlet></Outlet>
        </main>
      </div>
      <Toaster />
      {allert.open && (
        <Allert
          status={allert.status}
          message={allert.message}
          onClose={() => setAllert({ ...allert, open: false })}
        ></Allert>
      )}
    </div>
  );
};

export default AdminLayout;
