import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";

export default defineConfig({
    integrations: [svelte(), tailwind(), mdx()],
    output: "static",
    adapter: vercel({
        webAnalytics: {
            enabled: true
        }
    })
});
