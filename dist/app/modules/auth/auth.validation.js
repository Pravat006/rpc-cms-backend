"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.updatePasswordValidation = exports.loginValidation = exports.registerValidation = exports.phoneOrEmailSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const indianPhoneRegex = /^[6-9]\d{9}$/;
exports.phoneOrEmailSchema = zod_1.default
    .string()
    .trim()
    .refine((val) => zod_1.default.email().safeParse(val).success || indianPhoneRegex.test(val), {
    message: "Must be a valid Indian mobile number or a valid email address",
});
exports.registerValidation = zod_1.default.object({
    name: zod_1.default.string(),
    password: zod_1.default.string().min(6),
    phone: zod_1.default.string().regex(indianPhoneRegex, {
        message: "Invalid Indian mobile number. Must be 10 digits starting with 6, 7, 8, or 9"
    }),
    email: zod_1.default.email("Invalid email format").optional(),
});
exports.loginValidation = zod_1.default.object({
    phoneOrEmail: exports.phoneOrEmailSchema,
    password: zod_1.default.string()
});
exports.updatePasswordValidation = zod_1.default.object({
    currentPassword: zod_1.default.string().min(6),
    newPassword: zod_1.default.string().min(6)
});
exports.updateUserValidation = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.union([
        zod_1.default.email("Invalid email format"),
        zod_1.default.string().length(0)
    ]).optional(),
    img: zod_1.default.string().optional()
});
//# sourceMappingURL=auth.validation.js.map