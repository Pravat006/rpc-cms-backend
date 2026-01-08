"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonialValidation = exports.createTestimonialValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTestimonialValidation = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    profileImage: zod_1.default.string().url("Profile image must be a valid URL"),
    feedback: zod_1.default.string().min(1, "Feedback is required"),
    rating: zod_1.default.number().min(1).max(5).default(5),
    order: zod_1.default.number().int().min(0).default(0),
    isPublished: zod_1.default.boolean().default(false),
});
exports.updateTestimonialValidation = zod_1.default.object({
    name: zod_1.default.string().min(1).optional(),
    profileImage: zod_1.default.string().url().optional(),
    feedback: zod_1.default.string().min(1).optional(),
    rating: zod_1.default.number().min(1).max(5).optional(),
    order: zod_1.default.number().int().min(0).optional(),
    isPublished: zod_1.default.boolean().optional(),
});
//# sourceMappingURL=testimonial.validation.js.map