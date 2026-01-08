import z from "zod";

export const createTestimonialValidation = z.object({
    name: z.string().min(1, "Name is required"),
    profileImage: z.string().url("Profile image must be a valid URL"),
    feedback: z.string().min(1, "Feedback is required"),
    rating: z.number().min(1).max(5).default(5),
    order: z.number().int().min(0).default(0),
    isPublished: z.boolean().default(false),
});

export const updateTestimonialValidation = z.object({
    name: z.string().min(1).optional(),
    profileImage: z.string().url().optional(),
    feedback: z.string().min(1).optional(),
    rating: z.number().min(1).max(5).optional(),
    order: z.number().int().min(0).optional(),
    isPublished: z.boolean().optional(),
});
