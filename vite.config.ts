import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macros from "unplugin-parcel-macros";

export default defineConfig({
  plugins: [macros.vite(), react()],
});
