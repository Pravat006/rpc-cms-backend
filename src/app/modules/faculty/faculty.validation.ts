import z from "zod";

export const createFacultyValidation = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    department: z.string().min(1, "Department is required"),
    profileImage: z.string().url("Profile image must be a valid URL"),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    experience: z.string().optional(),
    qualifications: z.array(z.string()).optional().default([]),
    order: z.number().int().min(0).default(0),
    isActive: z.boolean().default(true),
});

export const updateFacultyValidation = z.object({
    name: z.string().min(1).optional(),
    role: z.string().min(1).optional(),
    department: z.string().min(1).optional(),
    profileImage: z.string().url().optional(),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    experience: z.string().optional(),
    qualifications: z.array(z.string()).optional(),
    order: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
});
