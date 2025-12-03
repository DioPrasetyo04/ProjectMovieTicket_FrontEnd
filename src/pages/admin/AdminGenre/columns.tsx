import { Badge } from "@/components/ui/badge";
import ActionColumn from "@/pages/admin/AdminGenre/ActionColumn";
import type { Genre } from "@/services/genre/genre.type";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Genre>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => <Badge>{row.original._id}</Badge>,
  },
  {
    accessorKey: "name",
    header: "Genre",
    cell: ({ row }) => <Badge>{row.original.name}</Badge>,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <Badge>{row.original.slug}</Badge>,
  },
  // {
  //   accessorKey: "movies",
  //   header: "Movies",
  //   cell: ({ row }) => <Badge>{row.original.movies}</Badge>,
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const genre = row.original;

      return <ActionColumn slug={genre.slug}></ActionColumn>;
    },
  },
];
