"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultyValidation = exports.createFacultyValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createFacultyValidation = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    role: zod_1.default.string().min(1, "Role is required"),
    department: zod_1.default.string().min(1, "Department is required"),
    profileImage: zod_1.default.string().url("Profile image must be a valid URL"),
    email: zod_1.default.string().email().optional().or(zod_1.default.literal("")),
    phone: zod_1.default.string().optional(),
    experience: zod_1.default.string().optional(),
    qualifications: zod_1.default.array(zod_1.default.string()).optional().default([]),
    order: zod_1.default.number().int().min(0).default(0),
    isActive: zod_1.default.boolean().default(true),
});
exports.updateFacultyValidation = zod_1.default.object({
    name: zod_1.default.string().min(1).optional(),
    role: zod_1.default.string().min(1).optional(),
    department: zod_1.default.string().min(1).optional(),
    profileImage: zod_1.default.string().url().optional(),
    email: zod_1.default.string().email().optional().or(zod_1.default.literal("")),
    phone: zod_1.default.string().optional(),
    experience: zod_1.default.string().optional(),
    qualifications: zod_1.default.array(zod_1.default.string()).optional(),
    order: zod_1.default.number().int().min(0).optional(),
    isActive: zod_1.default.boolean().optional(),
});
//# sourceMappingURL=faculty.validation.js.map