import { Badge } from "@/components/ui/badge";
import { rupiahFormat } from "@/lib/utils";
import type { Movie } from "@/services/movie/movies";
import type { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => <Badge>{row.original._id}</Badge>,
  },
  {
    accessorKey: "title",
    header: "Movie Detail",
    cell: ({ row }) => {
      const movieDetail = row.original;

      return (
        <div className="flex items-start gap-4 w-[350px]">
          <img
            src={movieDetail.thumbnailUrl}
            alt={movieDetail.title}
            className="w-[55px] h-[55px] rounded-full object-cover"
          />

          <div className="flex flex-col gap-1 w-full">
            <h4 className="font-bold text-lg truncate">{movieDetail.title}</h4>

            <p className="text-sm line-clamp-2 text-gray-600">
              {movieDetail.description}
            </p>

            <p className="text-sm font-medium">Bonus: {movieDetail.bonus}</p>

            <Badge
              variant={movieDetail.available ? "default" : "destructive"}
              className="w-fit text-xs"
            >
              {movieDetail.available ? "Live Now" : "Coming Soon"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "video_trailer",
    header: "Video Trailer",
    cell: ({ row }) => {
      const movieVideo = row.original;

      return (
        <div className="flex justify-center items-center">
          <div className="w-[300px] h-[200px] overflow-hidden rounded-md shadow border">
            <video
              src={movieVideo.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <Badge>{row.original.slug}</Badge>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => <Badge>{row.original.genre.name}</Badge>,
  },
  {
    accessorKey: "theaters",
    header: "Theaters",
    cell: ({ row }) => {
      const movie = row.original;

      return (
        <div className="flex flex-col gap-2 items-start">
          {movie.theaters.map((theater) => (
            <Badge variant="outline" key={theater._id}>
              {theater.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="min-w-[100px]">Actions</div>,
    cell: ({ row }) => {
      const movie = row.original;

      return <ActionColumn slug={movie.slug} />;
    },
  },
];
