import z from "zod";

export const createGalleryImageValidation = z.object({
    url: z.string().url("Image URL must be valid"),
    alt: z.string().min(1, "Alt text is required"),
    caption: z.string().optional(),
    album: z.string().optional().default("General"),
    order: z.number().int().min(0).default(0),
});

export const updateGalleryImageValidation = z.object({
    url: z.string().url().optional(),
    alt: z.string().min(1).optional(),
    caption: z.string().optional(),
    album: z.string().optional(),
    order: z.number().int().min(0).optional(),
});
