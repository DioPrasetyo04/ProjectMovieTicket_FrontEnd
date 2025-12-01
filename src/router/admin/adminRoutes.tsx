import { redirect, type RouteObject } from "react-router-dom";
import Login from "../../pages/admin/auth/Login";
import AdminOverview from "@/pages/admin/AdminOverview";
import AdminLayout from "@/components/admin-layout";
import { getSession } from "@/lib/utils";
import AdminGenre from "@/pages/admin/AdminGenre";
import { getGenres } from "@/services/genre/genre.service";
import AdminGenreForm from "@/pages/admin/AdminGenre/CreateGenre/form";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <Login></Login>,
  },
  {
    path: "/admin",
    // loader digunakan untuk mengecek di database server apakah user memiliki hak akses untuk mengakses halaman page atau tidak
    // dapat sebagai middleware page
    loader: () => {
      const user = getSession();

      if (!user || user.role !== "admin") {
        throw redirect("/admin/login");
      }

      console.log(user);
    },
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <AdminOverview></AdminOverview>,
      },
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
    ],
  },
];

export default adminRoutes;
