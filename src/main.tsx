import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import ThemeProvider from "./provider.tsx";
import Layout from "./layout.tsx";

import "./global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider>
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
              <Layout>
                <App />
              </Layout>
            </div>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
