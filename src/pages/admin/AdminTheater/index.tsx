import TitleHeading from "@/components/title-heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { columns } from "./columns";
import type { Theater } from "@/services/theater/theater.type";

const AdminTheaters = () => {
  const theaters = useLoaderData() as Theater[];
  return (
    <div className="flex flex-col gap-y-5 py-5 px-5">
      <TitleHeading title="List Theater"></TitleHeading>
      <Button className="bg-orange-600 w-[200px] max-w-[300px]" asChild>
        <Link
          className="px-5 py-3 flex gap-x-3 items-center rounded-full"
          to="/admin/genres/create"
        >
          <Plus className="w-5 h-5" />
          <p className="text-white font-bold text-[20px]">Add Data</p>
        </Link>
      </Button>
      <DataTable columns={columns} data={theaters}></DataTable>
    </div>
  );
};

export default AdminTheaters;
