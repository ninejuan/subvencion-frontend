import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  server: {
    cors: {
      origin: [
        "https://subvencion.juany.kr",
        "https://api-subvencion.juany.kr",
      ],
      methods: ["POST", "GET", "PATCH", "PUT", "OPTIONS", "DELETE"],
      allowedHeaders: ["*"],
    },
    allowedHosts: [
      "https://subvencion.juany.kr",
      "https://api-subvencion.juany.kr",
    ],
  },
});
