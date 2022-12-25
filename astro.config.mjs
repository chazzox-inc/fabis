import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), mdx(), svelte()],
    remarkPlugins: []
});
