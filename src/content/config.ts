import { defineCollection } from "astro:content";
import z from "zod";

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string()
    })
});

export const collections = {
    dropdowns: blogCollection
};
