import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import ThemeProvider from "./provider.tsx";
import Layout from "./layout.tsx";

import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
          <Layout>
            <App />
          </Layout>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
