import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
    integrations: [tailwind(), mdx(), svelte()],
    output: "static",
    adapter: vercel()
});
