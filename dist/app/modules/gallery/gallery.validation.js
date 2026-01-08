"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGalleryImageValidation = exports.createGalleryImageValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createGalleryImageValidation = zod_1.default.object({
    url: zod_1.default.string().url("Image URL must be valid"),
    alt: zod_1.default.string().min(1, "Alt text is required"),
    caption: zod_1.default.string().optional(),
    album: zod_1.default.string().optional().default("General"),
    order: zod_1.default.number().int().min(0).default(0),
});
exports.updateGalleryImageValidation = zod_1.default.object({
    url: zod_1.default.string().url().optional(),
    alt: zod_1.default.string().min(1).optional(),
    caption: zod_1.default.string().optional(),
    album: zod_1.default.string().optional(),
    order: zod_1.default.number().int().min(0).optional(),
});
//# sourceMappingURL=gallery.validation.js.map