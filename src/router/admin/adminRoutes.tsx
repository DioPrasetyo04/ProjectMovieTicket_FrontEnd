import { redirect, type RouteObject } from "react-router-dom";
import Login from "../../pages/admin/auth/Login";
import AdminOverview from "@/pages/admin/AdminOverview";
import AdminLayout from "@/components/admin-layout";
import { getSession } from "@/lib/utils";
import AdminGenre from "@/pages/admin/AdminGenre";
import { getDetailGenre, getGenres } from "@/services/genre/genre.service";
import AdminGenreForm from "@/pages/admin/AdminGenre/form";
import AdminTheaters from "@/pages/admin/AdminTheater";
import {
  getDetailTheater,
  getTheaters,
} from "@/services/theater/theater.service";
import AdminTheaterForm from "@/pages/admin/AdminTheater/form";
import AdminMovie from "@/pages/admin/AdminMovie";
import { getMovies } from "@/services/movie/movie.service";

const adminRoutes: RouteObject[] = [
  { path: "/admin/login", element: <Login></Login> },
  {
    path: "/admin",
    //loader digunakan untuk mengecek di database server apakah user memiliki hak akses untuk mengakses halaman page atau tidak dapat sebagai middleware page
    loader: () => {
      const user = getSession();
      if (!user || user.role !== "admin") {
        throw redirect("/admin/login");
      }
      // console.log(user);
    },
    element: <AdminLayout></AdminLayout>,
    children: [
      { index: true, element: <AdminOverview></AdminOverview> },
      {
        path: "/admin/genres",
        loader: async () => {
          const genres = await getGenres();
          return genres.data;
        },
        element: <AdminGenre></AdminGenre>,
      },
      {
        path: "/admin/genres/create",
        element: <AdminGenreForm></AdminGenreForm>,
      },
      {
        path: "/admin/genre/edit/:slug",
        loader: async ({ params }) => {
          if (!params.slug) {
            throw redirect("/admin/genres");
          }
          const detailGenre = await getDetailGenre(params.slug);
          return detailGenre.data;
        },
        element: <AdminGenreForm></AdminGenreForm>,
      },
      {
        path: "/admin/theaters",
        loader: async () => {
          const theaters = await getTheaters();
          return theaters.data;
        },
        element: <AdminTheaters></AdminTheaters>,
      },
      {
        path: "/admin/theaters/create",
        element: <AdminTheaterForm></AdminTheaterForm>,
      },
      {
        path: "/admin/theater/edit/:slug",
        loader: async ({ params }) => {
          if (!params.slug) {
            throw redirect("/admin/theaters");
          }
          const detailTheater = await getDetailTheater(params.slug);
          return detailTheater.data;
        },
        element: <AdminTheaterForm></AdminTheaterForm>,
      },
      {
        path: "/admin/movies",
        loader: async () => {
          const movies = await getMovies();

          return movies.data;
        },
        element: <AdminMovie></AdminMovie>,
      },
    ],
  },
];
export default adminRoutes;
