"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.emailCheckValidation = exports.phoneCheckValidation = exports.updatePasswordValidation = void 0;
const zod_1 = require("zod");
exports.updatePasswordValidation = zod_1.z.object({
    currentPassword: zod_1.z.string().min(6),
    newPassword: zod_1.z.string().min(6)
});
exports.phoneCheckValidation = zod_1.z.object({
    phone: zod_1.z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number. Must be 10 digits starting with 6, 7, 8, or 9")
});
exports.emailCheckValidation = zod_1.z.object({
    email: zod_1.z.email("Invalid email format")
});
exports.updateUserValidation = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.union([
        zod_1.z.email("Invalid email format"),
        zod_1.z.string().length(0)
    ]).optional(),
    img: zod_1.z.string().optional()
});
//# sourceMappingURL=user.validation.js.map