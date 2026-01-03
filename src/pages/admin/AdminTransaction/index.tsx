import TitleHeading from "@/components/title-heading";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useLoaderData } from "react-router-dom";
import type { Transaction, User } from "@/services/customers/user.type";

const AdminTransactions = () => {
  const transactions = useLoaderData() as Transaction[];
  return (
    <div className="flex flex-col gap-y-5 py-5 px-5">
      <TitleHeading title="List Data Transactions"></TitleHeading>
      <div className="flex flex-col gap-y-4 py-2">
        <DataTable columns={columns} data={transactions}></DataTable>
      </div>
    </div>
  );
};

export default AdminTransactions;
