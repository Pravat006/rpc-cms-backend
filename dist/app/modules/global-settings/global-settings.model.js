"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSettings = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongooseToJSON_1 = __importDefault(require("../../utils/mongooseToJSON"));
const navigationItemSchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, required: true },
    isExternal: { type: Boolean, default: false },
}, { _id: true });
// Self-referencing for children (represented as nested array in interface but handled flat or nested in logic)
// For simplicity in this schema, we store them as a nested structure
navigationItemSchema.add({
    children: [navigationItemSchema]
});
const globalSettingsSchema = new mongoose_1.Schema({
    siteName: { type: String },
    location: { type: String },
    logo: { type: String },
    logoAlt: { type: String },
    contact: {
        phones: [{ type: String }],
        emails: [{ type: String }],
        address: {
            title: { type: String },
            lines: [{ type: String }],
        },
    },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String },
    },
    ctaButtonLabel: { type: String },
    ctaButtonUrl: { type: String },
    menus: {
        header: [navigationItemSchema],
        footerQuickLinks: [navigationItemSchema],
        footerSecondary: [navigationItemSchema],
    },
}, {
    timestamps: true,
});
(0, mongooseToJSON_1.default)(globalSettingsSchema);
exports.GlobalSettings = mongoose_1.default.models.GlobalSettings || mongoose_1.default.model("GlobalSettings", globalSettingsSchema);
//# sourceMappingURL=global-settings.model.js.map