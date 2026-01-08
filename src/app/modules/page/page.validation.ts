import z from "zod";

const sectionSettingsSchema = z.object({
    hideHeader: z.boolean().optional(),
    reversed: z.boolean().optional(),
    background: z.enum(["white", "gray", "primary"]).optional(),
}).optional();

const sectionSchema = z.object({
    type: z.string().min(1, "Section type is required"),
    title: z.string().optional(),
    adminLabel: z.string().optional(),
    order: z.number().int().min(0),
    data: z.record(z.string(), z.any()),
    settings: sectionSettingsSchema,
});

export const createPageValidation = z.object({
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    title: z.string().min(1, "Title is required"),
    metaDescription: z.string().optional(),
    backgroundImage: z.string().url("Background image must be a valid URL"),
    sections: z.array(sectionSchema).default([]),
    isPublished: z.boolean().default(false),
});

export const updatePageValidation = z.object({
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens").optional(),
    title: z.string().min(1).optional(),
    metaDescription: z.string().optional(),
    backgroundImage: z.string().url().optional(),
    sections: z.array(sectionSchema).optional(),
    isPublished: z.boolean().optional(),
});

export const togglePublishValidation = z.object({
    isPublished: z.boolean(),
});
