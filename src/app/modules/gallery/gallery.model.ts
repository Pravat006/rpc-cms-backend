import mongoose, { Schema } from "mongoose";
import { IGalleryImage } from "./gallery.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const galleryImageSchema = new Schema<IGalleryImage>(
    {
        url: { type: String, required: true },
        alt: { type: String, required: true },
        caption: { type: String },
        album: { type: String, default: "General" },
        order: { type: Number, default: 0 },
    },
    {
        timestamps: { createdAt: "uploadedAt", updatedAt: false },
    }
);

applyMongooseToJSON(galleryImageSchema);

galleryImageSchema.index({ album: 1 });
galleryImageSchema.index({ order: 1 });

export const GalleryImage: mongoose.Model<IGalleryImage> =
    mongoose.models.GalleryImage || mongoose.model<IGalleryImage>("GalleryImage", galleryImageSchema);
