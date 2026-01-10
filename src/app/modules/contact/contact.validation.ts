import { z } from "zod";

export const createContactValidation = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export const updateContactValidation = z.object({
    isRead: z.boolean().optional(),
});
