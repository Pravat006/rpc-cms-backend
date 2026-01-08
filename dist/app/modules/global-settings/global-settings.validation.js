"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGlobalSettingsValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const navigationItemSchema = zod_1.default.lazy(() => zod_1.default.object({
    label: zod_1.default.string().min(1),
    url: zod_1.default.string().min(1),
    order: zod_1.default.number().int().min(0),
    isExternal: zod_1.default.boolean().default(false),
    children: zod_1.default.array(navigationItemSchema).optional(),
}));
exports.updateGlobalSettingsValidation = zod_1.default.object({
    siteName: zod_1.default.string().min(1).optional(),
    location: zod_1.default.string().min(1).optional(),
    logo: zod_1.default.string().url().optional(),
    logoAlt: zod_1.default.string().min(1).optional(),
    contact: zod_1.default.object({
        phones: zod_1.default.array(zod_1.default.string()).optional(),
        emails: zod_1.default.array(zod_1.default.string().email()).optional(),
        address: zod_1.default.object({
            title: zod_1.default.string().optional(),
            lines: zod_1.default.array(zod_1.default.string()).optional(),
        }).optional(),
    }).optional(),
    socialLinks: zod_1.default.object({
        facebook: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
        twitter: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
        instagram: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
        linkedin: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
    }).optional(),
    ctaButtonLabel: zod_1.default.string().min(1).optional(),
    ctaButtonUrl: zod_1.default.string().optional(),
    menus: zod_1.default.object({
        header: zod_1.default.array(navigationItemSchema).optional(),
        footerQuickLinks: zod_1.default.array(navigationItemSchema).optional(),
        footerSecondary: zod_1.default.array(navigationItemSchema).optional(),
    }).optional(),
});
//# sourceMappingURL=global-settings.validation.js.map