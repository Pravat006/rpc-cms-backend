import { GlobalSettings } from "./global-settings.model";
import { updateGlobalSettingsValidation } from "./global-settings.validation";
import { asyncHandler } from "@/utils";
import { getApiResponseClass } from "@/interface";
import status from "http-status";

const ApiResponse = getApiResponseClass("GLOBAL_SETTINGS");

export const getGlobalSettings = asyncHandler(async (req, res) => {
    let settings = await GlobalSettings.findOne();

    // Initialize if not exists
    if (!settings) {
        settings = new GlobalSettings({
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

    res.json(new ApiResponse(status.OK, "Global settings retrieved successfully", settings));
});

export const updateGlobalSettings = asyncHandler(async (req, res) => {
    const validatedData = updateGlobalSettingsValidation.parse(req.body);

    let settings = await GlobalSettings.findOne();

    if (!settings) {
        settings = new GlobalSettings(validatedData);
        await settings.save();
    } else {
        settings = await GlobalSettings.findOneAndUpdate(
            {},
            validatedData,
            { new: true, runValidators: true }
        );
    }

    res.json(new ApiResponse(status.OK, "Global settings updated successfully", settings));
});
