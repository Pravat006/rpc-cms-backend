"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamMemberValidation = exports.createTeamMemberValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTeamMemberValidation = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    role: zod_1.default.string().min(1, "Role is required"),
    image: zod_1.default.string().url("Image must be a valid URL"),
    bio: zod_1.default.array(zod_1.default.string()).optional().default([]),
    order: zod_1.default.number().int().min(0).default(0),
    category: zod_1.default.enum(["leadership", "placement"]),
    isActive: zod_1.default.boolean().default(true),
});
exports.updateTeamMemberValidation = zod_1.default.object({
    name: zod_1.default.string().min(1).optional(),
    role: zod_1.default.string().min(1).optional(),
    image: zod_1.default.string().url().optional(),
    bio: zod_1.default.array(zod_1.default.string()).optional(),
    order: zod_1.default.number().int().min(0).optional(),
    category: zod_1.default.enum(["leadership", "placement"]).optional(),
    isActive: zod_1.default.boolean().optional(),
});
//# sourceMappingURL=team.validation.js.map