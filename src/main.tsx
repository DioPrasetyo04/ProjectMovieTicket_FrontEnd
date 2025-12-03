import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllertProvider } from "./context/AllertContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <AllertProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </AllertProvider>
);
