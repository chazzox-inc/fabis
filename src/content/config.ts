import { defineCollection } from "astro:content";
import z from "zod";
// 2. Define your collection(s)
const blogCollection = defineCollection({
    schema: z.object({
        title: z.string()
    })
});

export const collections = {
    dropdowns: blogCollection
};
