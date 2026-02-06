import { getSession } from "@/lib/utils";
import CustomerBrowseGenre from "@/pages/customer/CustomerBrowse";
import CustomerHome from "@/pages/customer/CustomerHome/CustomerHome";
import CustomerDetailMovie from "@/pages/customer/CustomerMovieDetail";
import SelectedTheater from "@/pages/customer/CustomerMovieDetail/SelectedTheater";
import CustomerSignIn from "@/pages/customer/CustomerSignIn/CustomerSignIn";
import CustomerSignUp from "@/pages/customer/CustomerSignup/CustomerSignUp";
import CustomerTransactions from "@/pages/customer/CustomerTransaction/CustomerTransactions";
import CustomerTransactionSuccess from "@/pages/customer/CustomerTransactionCallback/CustomerTransactionSuccess";
import CustomerWallet from "@/pages/customer/CustomerWalletTransaction/CustomerWallet";
import {
  getGenres,
  getMovieDetail,
  getMovies,
} from "@/services/global/global.service";
import { getTheaters } from "@/services/theater/theater.service";
import { redirect, type RouteObject } from "react-router-dom";

const customerRoutes: RouteObject[] = [
  {
    path: "/sign-up",
    element: <CustomerSignUp></CustomerSignUp>,
  },
  {
    path: "/sign-in",
    element: <CustomerSignIn></CustomerSignIn>,
  },
  {
    path: "/",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      const movies = await getMovies();
      const genres = await getGenres();

      return {
        movies: movies.data,
        genres: genres.data,
      };
    },
    element: <CustomerHome></CustomerHome>,
  },
  {
    path: "/browse/:genreId",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      if (!params.genreId) {
        throw redirect("/");
      }

      const genres = await getGenres();

      const theaters = await getTheaters("customer");

      // console.log({
      //   genres,
      //   theaters,
      // });

      return {
        genres: genres.data,
        theaters: theaters.data,
      };
    },
    element: <CustomerBrowseGenre></CustomerBrowseGenre>,
  },
  {
    path: "/movie/:movieSlug",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      if (!params.movieSlug) {
        throw redirect("/");
      }

      const movieDetail = await getMovieDetail(params.movieSlug as string);

      return {
        detail: movieDetail.data.movie,
      };
    },
    element: <CustomerDetailMovie></CustomerDetailMovie>,
  },
  {
    path: "/transaction-ticket",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerTransactions></CustomerTransactions>,
  },
  {
    path: "/transaction-ticket/success",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerTransactionSuccess></CustomerTransactionSuccess>,
  },
  {
    path: "/wallets",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerWallet></CustomerWallet>,
  },
];

export default customerRoutes;
