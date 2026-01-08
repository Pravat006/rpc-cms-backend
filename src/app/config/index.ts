import dotenv from "dotenv";
import path from "path";
import z from "zod";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
  quiet: true,
});

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string({
    error: "DATABASE_URL is required",
  }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
  CLOUDINARY_UPLOAD_PRESET: z.string().optional(),
  JWT_SECRET: z.string({
    error: "JWT_SECRET is required",
  }),
  DEFAULT_ADMIN_EMAIL: z.string().email().default("admin@test.com"),
  DEFAULT_ADMIN_PHONE: z.string().default("8956741250"),
  DEFAULT_ADMIN_PASSWORD: z.string().default("admin_password"),
});

let envVars: z.infer<typeof envSchema>;
try {
  envVars = envSchema.parse(process.env);
  console.info("[ENV] Environment variables loaded.");
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(
      "[ENV] Environment variable validation error:",
      error.issues.map((issue) => issue.message).join(", ")
    );
  } else {
    console.error(
      "[ENV] Unexpected error during environment variable validation:",
      error
    );
  }
  process.exit(1);
}

export default envVars;
