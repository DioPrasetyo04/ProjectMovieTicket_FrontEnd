import TitleHeading from "@/components/title-heading";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useLoaderData } from "react-router-dom";
import type { WalletTransaction } from "@/services/customers/user.type";

const AdminWalletTransactions = () => {
  const walletTransactionsData = useLoaderData() as WalletTransaction[];
  return (
    <div className="flex flex-col gap-y-5 py-5 px-5">
      <TitleHeading title="List Data Wallet Transactions"></TitleHeading>
      <div className="flex flex-col gap-y-4 py-2">
        <DataTable columns={columns} data={walletTransactionsData}></DataTable>
      </div>
    </div>
  );
};

export default AdminWalletTransactions;
