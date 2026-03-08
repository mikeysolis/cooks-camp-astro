import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const cottages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cottages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sleeps: z.number(),
    bedrooms: z.number(),
    bathrooms: z.union([z.number(), z.string()]),
    category: z.enum(["large", "medium", "small"]),
    amenities: z.array(z.string()),
    hero: z.string(),
    photos: z.array(z.string()),
    featured: z.boolean(),
    order: z.number().optional(),
    legacyHighlights: z.array(z.string()).optional(),
  }),
});

export const collections = {
  pages,
  cottages,
};
