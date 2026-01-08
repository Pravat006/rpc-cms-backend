"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidation = exports.createPostValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createPostValidation = zod_1.default.object({
    title: zod_1.default.string().min(1, "Title is required"),
    slug: zod_1.default.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    image: zod_1.default.string().url("Featured image must be a valid URL"),
    content: zod_1.default.string().optional(),
    excerpt: zod_1.default.string().optional(),
    category: zod_1.default.enum(["blog", "admission", "news"]),
    publishDate: zod_1.default.string().optional().transform(val => val ? new Date(val) : new Date()),
    author: zod_1.default.string().optional(),
    tags: zod_1.default.array(zod_1.default.string()).optional().default([]),
    isPublished: zod_1.default.boolean().default(false),
});
exports.updatePostValidation = zod_1.default.object({
    title: zod_1.default.string().min(1).optional(),
    slug: zod_1.default.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens").optional(),
    image: zod_1.default.string().url().optional(),
    content: zod_1.default.string().optional(),
    excerpt: zod_1.default.string().optional(),
    category: zod_1.default.enum(["blog", "admission", "news"]).optional(),
    publishDate: zod_1.default.string().optional().transform(val => val ? new Date(val) : undefined),
    author: zod_1.default.string().optional(),
    tags: zod_1.default.array(zod_1.default.string()).optional(),
    isPublished: zod_1.default.boolean().optional(),
});
//# sourceMappingURL=post.validation.js.map