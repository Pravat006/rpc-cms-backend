"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = __importDefault(require("zod"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), ".env"),
    quiet: true,
});
const envSchema = zod_1.default.object({
    PORT: zod_1.default.coerce.number().default(3000),
    DATABASE_URL: zod_1.default.string({
        error: "DATABASE_URL is required",
    }),
    NODE_ENV: zod_1.default
        .enum(["development", "production", "test"])
        .default("development"),
    CLOUDINARY_CLOUD_NAME: zod_1.default.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
    CLOUDINARY_API_KEY: zod_1.default.string().min(1, "CLOUDINARY_API_KEY is required"),
    CLOUDINARY_API_SECRET: zod_1.default.string().min(1, "CLOUDINARY_API_SECRET is required"),
    CLOUDINARY_UPLOAD_PRESET: zod_1.default.string().optional(),
    JWT_SECRET: zod_1.default.string({
        error: "JWT_SECRET is required",
    }),
    DEFAULT_ADMIN_EMAIL: zod_1.default.string().email().default("admin@test.com"),
    DEFAULT_ADMIN_PHONE: zod_1.default.string().default("8956741250"),
    DEFAULT_ADMIN_PASSWORD: zod_1.default.string().default("admin_password"),
});
let envVars;
try {
    envVars = envSchema.parse(process.env);
    console.info("[ENV] Environment variables loaded.");
}
catch (error) {
    if (error instanceof zod_1.default.ZodError) {
        console.error("[ENV] Environment variable validation error:", error.issues.map((issue) => issue.message).join(", "));
    }
    else {
        console.error("[ENV] Unexpected error during environment variable validation:", error);
    }
    process.exit(1);
}
exports.default = envVars;
//# sourceMappingURL=index.js.map