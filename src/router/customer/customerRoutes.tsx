import { getSession } from "@/lib/utils";
import CustomerBrowseGenre from "@/pages/customer/CustomerBrowse";
import CustomerCallbackWalletTopUp from "@/pages/customer/CustomerCallbackWalletTopUp/CustomerCallbackWalletTopUp";
import CustomerDetailOrders from "@/pages/customer/CustomerDetailOrders/CustomerDetailOrders";
import CustomerHome from "@/pages/customer/CustomerHome/CustomerHome";
import CustomerDetailMovie from "@/pages/customer/CustomerMovieDetail";
import SelectedTheater from "@/pages/customer/CustomerMovieDetail/SelectedTheater";
import CustomerOrderDetails from "@/pages/customer/CustomerOrderDetails/CustomerOrderDetails";
import OrderDetails from "@/pages/customer/CustomerOrderDetails/CustomerOrderDetails";
import CustomerSettings from "@/pages/customer/CustomerSettings/CustomerSettings";
import CustomerSignIn from "@/pages/customer/CustomerSignIn/CustomerSignIn";
import CustomerSignUp from "@/pages/customer/CustomerSignup/CustomerSignUp";
import CustomerTransactions from "@/pages/customer/CustomerTransaction/CustomerTransactions";
import CustomerTransactionSuccess from "@/pages/customer/CustomerTransactionCallback/CustomerTransactionSuccess";
import CustomerWalletTopUp from "@/pages/customer/CustomerWalletTopUp/CustomerWalletTopUp";
import CustomerWallet from "@/pages/customer/CustomerWalletTransaction/CustomerWallet";
import {
  getGenres,
  getMovieDetail,
  getMovies,
} from "@/services/global/global.service";
import { getTheaters } from "@/services/theater/theater.service";
import {
  getOrderDetails,
  getOrders,
} from "@/services/transaction/orders.service";
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
  {
    path: "/wallets/topup",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerWalletTopUp></CustomerWalletTopUp>,
  },
  {
    path: "/wallets/topup/success",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerCallbackWalletTopUp></CustomerCallbackWalletTopUp>,
  },
  {
    path: "/tickets",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      const orders = await getOrders();

      return orders.data;
    },

    element: <CustomerOrderDetails></CustomerOrderDetails>,
  },
  {
    path: "/orders/:orderId",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      if (!params.orderId) {
        throw redirect("/orders");
      }

      const transaction = await getOrderDetails(params.orderId);

      return transaction.data;
    },

    element: <CustomerDetailOrders></CustomerDetailOrders>,
  },
  {
    path: "/settings",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerSettings></CustomerSettings>,
  },
];

export default customerRoutes;
