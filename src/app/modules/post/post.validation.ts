import z from "zod";

export const createPostValidation = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    image: z.string().url("Featured image must be a valid URL"),
    content: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.enum(["blog", "admission", "news"]),
    publishDate: z.string().optional().transform(val => val ? new Date(val) : new Date()),
    author: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    isPublished: z.boolean().default(false),
});

export const updatePostValidation = z.object({
    title: z.string().min(1).optional(),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens").optional(),
    image: z.string().url().optional(),
    content: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.enum(["blog", "admission", "news"]).optional(),
    publishDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
});
