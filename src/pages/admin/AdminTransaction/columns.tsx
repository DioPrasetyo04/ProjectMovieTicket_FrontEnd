import { Badge } from "@/components/ui/badge";
import { dateFormated, rupiahFormat } from "@/lib/utils";
import type { Transaction } from "@/services/customers/user.type";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "_id",
    header: "Transaction ID",
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => rupiahFormat(row.original.subtotal),
  },
  {
    accessorKey: "bookingFee",
    header: "Booking Fee",
    cell: ({ row }) => rupiahFormat(row.original.bookingFee),
  },
  {
    accessorKey: "tax",
    header: "Tax",
    cell: ({ row }) => rupiahFormat(row.original.tax),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => rupiahFormat(row.original.total),
  },
  {
    accessorKey: "createdAt",
    header: "Transaction Date",
    cell: ({ row }) => dateFormated(row.original.createdAt, "DD-MM-YYYY HH:mm"),
  },
];
