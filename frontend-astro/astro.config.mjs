import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  experimental: {
    actions: true,
  },
  integrations: [
    solidJs(),
    tailwind({
      nesting: true,
    }),
  ],
});
