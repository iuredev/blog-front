import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: parseInt(env.VITE_PORT || "5174"),
      host: true,
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
      ],

      proxy: {
        "/api": {
          target: `${env.VITE_API_URL}/api`,
        },
        // "/admin": {
        //   target: `${env.VITE_API_URL}/admin`,
        // },
      },
    },
    plugins: [react()],
  };
});
