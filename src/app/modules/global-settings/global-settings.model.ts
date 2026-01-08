import mongoose, { Schema } from "mongoose";
import { IGlobalSettings, INavigationItem } from "./global-settings.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const navigationItemSchema = new Schema<INavigationItem>(
    {
        label: { type: String, required: true },
        url: { type: String, required: true },
        order: { type: Number, required: true },
        isExternal: { type: Boolean, default: false },
    },
    { _id: true }
);

// Self-referencing for children (represented as nested array in interface but handled flat or nested in logic)
// For simplicity in this schema, we store them as a nested structure
navigationItemSchema.add({
    children: [navigationItemSchema]
});

const globalSettingsSchema = new Schema<IGlobalSettings>(
    {
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
    },
    {
        timestamps: true,
    }
);

applyMongooseToJSON(globalSettingsSchema);

export const GlobalSettings: mongoose.Model<IGlobalSettings> =
    mongoose.models.GlobalSettings || mongoose.model<IGlobalSettings>("GlobalSettings", globalSettingsSchema);
