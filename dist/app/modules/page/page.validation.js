"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.togglePublishValidation = exports.updatePageValidation = exports.createPageValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const sectionSettingsSchema = zod_1.default.object({
    hideHeader: zod_1.default.boolean().optional(),
    reversed: zod_1.default.boolean().optional(),
    background: zod_1.default.enum(["white", "gray", "primary"]).optional(),
}).optional();
const sectionSchema = zod_1.default.object({
    type: zod_1.default.string().min(1, "Section type is required"),
    order: zod_1.default.number().int().min(0),
    data: zod_1.default.record(zod_1.default.string(), zod_1.default.any()),
    settings: sectionSettingsSchema,
});
exports.createPageValidation = zod_1.default.object({
    slug: zod_1.default.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    title: zod_1.default.string().min(1, "Title is required"),
    metaDescription: zod_1.default.string().optional(),
    backgroundImage: zod_1.default.string().url("Background image must be a valid URL"),
    sections: zod_1.default.array(sectionSchema).default([]),
    isPublished: zod_1.default.boolean().default(false),
});
exports.updatePageValidation = zod_1.default.object({
    slug: zod_1.default.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens").optional(),
    title: zod_1.default.string().min(1).optional(),
    metaDescription: zod_1.default.string().optional(),
    backgroundImage: zod_1.default.string().url().optional(),
    sections: zod_1.default.array(sectionSchema).optional(),
    isPublished: zod_1.default.boolean().optional(),
});
exports.togglePublishValidation = zod_1.default.object({
    isPublished: zod_1.default.boolean(),
});
//# sourceMappingURL=page.validation.js.map