import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastProvider } from "@components/ToastProvider";
import { queryClient } from "@libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>
);
