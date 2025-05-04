// web/vite.config.js
// Arquivo CORRIGIDO

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Ou '@vitejs/plugin-react' dependendo do seu setup inicial

// https://vitejs.dev/config/
export default defineConfig({
  base: "/furia-chatbot/",
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
});
