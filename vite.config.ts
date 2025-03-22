import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePluginRadar } from "vite-plugin-radar";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: parseInt(env.VITE_PORT || "5174"),
      host: true,
      open: true,
    },
    preview: {
      port: parseInt(env.VITE_PORT || "5174"),
      host: true,
      allowedHosts: [
        "localhost",
        "127.0.0.1",
        "0.0.0.0",
        "www.iure.site",
        "iure.site",
        "dev.iure.site",
        "iure.dev",
        "www.iure.dev",
        "dev.iure.dev",
      ],
    },
    plugins: [
      react(),
      VitePluginRadar({
        enableDev: true,
        analytics: [
          {
            id: env.VITE_GOOGLE_ANALYTICS_ID,
          },
        ],
      }),
    ],
  };
});
