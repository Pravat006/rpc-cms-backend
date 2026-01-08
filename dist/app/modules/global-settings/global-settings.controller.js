"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGlobalSettings = exports.getGlobalSettings = void 0;
const global_settings_model_1 = require("./global-settings.model");
const global_settings_validation_1 = require("./global-settings.validation");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiResponse = (0, interface_1.getApiResponseClass)("GLOBAL_SETTINGS");
exports.getGlobalSettings = (0, utils_1.asyncHandler)(async (req, res) => {
    let settings = await global_settings_model_1.GlobalSettings.findOne();
    // Initialize if not exists
    if (!settings) {
        settings = new global_settings_model_1.GlobalSettings({
            siteName: "",
            location: "",
            logo: "",
            logoAlt: "",
            contact: {
                phones: [],
                emails: [],
                address: {
                    title: "",
                    lines: []
                }
            },
            socialLinks: {
                facebook: "",
                twitter: "",
                instagram: "",
                linkedin: "",
            },
            ctaButtonLabel: "",
            ctaButtonUrl: "",
            menus: {
                header: [],
                footerQuickLinks: [],
                footerSecondary: [],
            },
        });
        await settings.save();
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Global settings retrieved successfully", settings));
});
exports.updateGlobalSettings = (0, utils_1.asyncHandler)(async (req, res) => {
    const validatedData = global_settings_validation_1.updateGlobalSettingsValidation.parse(req.body);
    let settings = await global_settings_model_1.GlobalSettings.findOne();
    if (!settings) {
        settings = new global_settings_model_1.GlobalSettings(validatedData);
        await settings.save();
    }
    else {
        settings = await global_settings_model_1.GlobalSettings.findOneAndUpdate({}, validatedData, { new: true, runValidators: true });
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Global settings updated successfully", settings));
});
//# sourceMappingURL=global-settings.controller.js.map