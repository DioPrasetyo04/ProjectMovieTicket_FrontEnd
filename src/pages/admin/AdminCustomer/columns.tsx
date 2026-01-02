import type { User } from "@/services/customers/user.type";
import type { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name User",
  },
  {
    accessorKey: "email",
    header: "Email User",
  },
  {
    accessorKey: "photo",
    header: "Photo User",
    cell: ({ row }) => {
      const Photo = row.original;

      return (
        <div className="flex items-start gap-4 w-full">
          <img
            src={Photo.photoUrl}
            alt={Photo.name}
            className="w-[55px] h-[55px] rounded-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role User",
    cell: ({ row }) => {
      const User = row.original;
      return (
        <div className="flex items-center justify-center gap-4 w-full">
          {User.role === "admin" ? (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">
              Admin
            </span>
          ) : (
            <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">
              Customer
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <ActionColumn email={user.email}></ActionColumn>;
    },
  },
];
