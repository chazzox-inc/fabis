import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
    integrations: [tailwind(), mdx(), svelte()],
    output: "hybrid",
    adapter: vercel()
});
