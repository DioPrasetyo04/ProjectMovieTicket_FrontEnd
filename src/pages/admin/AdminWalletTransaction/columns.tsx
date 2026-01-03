import { Badge } from "@/components/ui/badge";
import { dateFormated, rupiahFormat } from "@/lib/utils";
import type { User, WalletTransaction } from "@/services/customers/user.type";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<WalletTransaction>[] = [
  {
    accessorKey: "_id",
    header: "Wallet Transaction ID",
  },
  {
    accessorKey: "wallet",
    header: "Customer Name",
    cell: ({ row }) => {
      const wallet = row.original.wallet;

      if (!wallet || !wallet.user) {
        return <span className="text-black font-semibold">-</span>;
      }

      return (
        <span className="font-semibold text-md bg-green-500 px-2 py-3 rounded-full">
          {wallet.user.name}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <>
          {status === "success" ? (
            <Badge className="bg-green-500 text-white px-2 py-1 rounded-md text-md">
              Success
            </Badge>
          ) : status === "pending" ? (
            <Badge className="bg-yellow-500 text-white px-2 py-1 rounded-md text-md">
              Pending
            </Badge>
          ) : (
            <Badge className="bg-red-500 text-white px-2 py-1 rounded-md text-md">
              Failed
            </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Transaction Date",
    cell: ({ row }) => dateFormated(row.original.createdAt, "DD-MM-YYYY HH:mm"),
  },
];
