import { Badge } from "@/components/ui/badge";
import type { Genre } from "@/services/genre/genre.type";
import type { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";

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
  {
    accessorKey: "movies",
    header: "Movies",
    cell: ({ row }) => {
      const moviess = row.original.movies;

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3 px-2 py-2">
          {moviess.map((movie, index) => {
            const LastData = index === moviess.length - 1; // movie terakhir
            const IsSingle = moviess.length === 1; // cuma 1 data
            const IsTwo = moviess.length === 2; // cuma 2 data
            const IsModuloSingle = moviess.length % 3 === 1; // sisa 1 jika dibagi 3

            const spanClass =
              IsSingle || IsTwo || (LastData && IsModuloSingle)
                ? "lg:col-span-3 flex items-center"
                : "flex items-center";

            return (
              <div key={movie._id} className={spanClass}>
                <Badge className="font-semibold">{movie.title}</Badge>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const genre = row.original;

      return <ActionColumn slug={genre.slug}></ActionColumn>;
    },
  },
];
