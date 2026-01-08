import z from "zod";

export const createTeamMemberValidation = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    image: z.string().url("Image must be a valid URL"),
    bio: z.array(z.string()).optional().default([]),
    order: z.number().int().min(0).default(0),
    category: z.enum(["leadership", "placement"]),
    isActive: z.boolean().default(true),
});

export const updateTeamMemberValidation = z.object({
    name: z.string().min(1).optional(),
    role: z.string().min(1).optional(),
    image: z.string().url().optional(),
    bio: z.array(z.string()).optional(),
    order: z.number().int().min(0).optional(),
    category: z.enum(["leadership", "placement"]).optional(),
    isActive: z.boolean().optional(),
});
