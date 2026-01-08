import z from "zod";

const indianPhoneRegex = /^[6-9]\d{9}$/;

export const phoneOrEmailSchema = z
  .string()
  .trim()
  .refine(
    (val) => z.email().safeParse(val).success || indianPhoneRegex.test(val),
    {
      message: "Must be a valid Indian mobile number or a valid email address",
    }
  );

export const registerValidation = z.object({
  name: z.string(),
  password: z.string().min(6),
  phone: z.string().regex(indianPhoneRegex, {
    message: "Invalid Indian mobile number. Must be 10 digits starting with 6, 7, 8, or 9"
  }),
  email: z.email("Invalid email format").optional(),
});

export const loginValidation = z.object({
  phoneOrEmail: phoneOrEmailSchema,
  password: z.string()
});

export const updatePasswordValidation = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6)
});

export const updateUserValidation = z.object({
  name: z.string().optional(),
  email: z.union([
    z.email("Invalid email format"),
    z.string().length(0)
  ]).optional(),
  img: z.string().optional()
});
