import { Badge } from "@/components/ui/badge";
import type { Theater } from "@/services/theater/theater.type";
import type { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";

export const columns: ColumnDef<Theater>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="min-w-[160px]">ID</div>,
    cell: ({ row }) => <Badge className="w-full">{row.original._id}</Badge>,
    size: 200,
  },
  {
    accessorKey: "name",
    header: () => <div className="min-w-[140px]">Name</div>,
    cell: ({ row }) => <Badge className="w-full">{row.original.name}</Badge>,
  },
  {
    accessorKey: "slug",
    header: () => <div className="min-w-[150px]">Slug</div>,
    cell: ({ row }) => <Badge className="w-full">{row.original.slug}</Badge>,
  },
  {
    accessorKey: "city",
    header: () => <div className="min-w-[180px]">City</div>,
    cell: ({ row }) => <Badge className="w-full">{row.original.city}</Badge>,
  },
  {
    accessorKey: "address",
    header: () => <div className="min-w-[220px]">Address</div>,
    cell: ({ row }) => (
      <Badge className="w-full whitespace-normal break-words">
        {row.original.address}
      </Badge>
    ),
  },
  {
    accessorKey: "movies",
    header: () => (
      <div className="lg:min-w-[400px] md:min-w-[300px] min-w-[200px] text-center items-center justify-center">
        Movies
      </div>
    ),
    cell: ({ row }) => {
      const moviess = row.original.movies;

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3 px-2 py-2 w-full justify-center items-center place-items-center">
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
    accessorKey: "total_seats",
    header: () => <div className="min-w-[100px] text-center">Total Seats</div>,
    cell: ({ row }) => (
      <Badge className="w-full text-center">{row.original.total_seats}</Badge>
    ),
  },
  {
    accessorKey: "total_rows",
    header: () => <div className="min-w-[100px] text-center">Total Rows</div>,
    cell: ({ row }) => {
      const total_rows = row.original.layout.total_rows;
      return <Badge className="w-full text-center">{total_rows}</Badge>;
    },
  },
  {
    accessorKey: "seat_per_row",
    header: () => <div className="min-w-[110px] text-center">Seat Per Row</div>,
    cell: ({ row }) => {
      const seat_per_row = row.original.layout.seat_per_row;
      return <Badge className="w-full text-center">{seat_per_row}</Badge>;
    },
  },
  {
    accessorKey: "seats",
    header: () => <div className="min-w-[200px] text-center">Seats</div>,
    cell: ({ row }) => {
      const seats = row.original.layout.seats;

      return (
        <div className="max-h-[150px] overflow-y-auto grid grid-cols-3 gap-1 p-2">
          {seats.map((seat) => (
            <Badge
              key={seat._id}
              variant={
                seat.status === "available"
                  ? "default"
                  : seat.status === "booked"
                  ? "destructive"
                  : "outline"
              }
              className="text-center"
            >
              {seat.seat_number}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="min-w-[220px] text-center">Status</div>,
    cell: () => (
      <div className="grid grid-cols-1 gap-1 p-5">
        <Badge className="w-full text-center" variant="default">
          Available
        </Badge>
        <Badge className="w-full text-center" variant="destructive">
          Booked
        </Badge>
        <Badge className="w-full text-center" variant="outline">
          Not Available
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="min-w-[100px]">Actions</div>,
    cell: ({ row }) => <ActionColumn slug={row.original.slug} />,
  },
];
