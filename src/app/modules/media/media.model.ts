import mongoose, { Schema } from "mongoose";
import { IMedia } from "./media.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const mediaSchema = new Schema<IMedia>(
    {
        filename: { type: String, required: true },
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        type: { type: String, enum: ["image", "video", "document"], required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: { createdAt: "uploadedAt", updatedAt: false },
    }
);

applyMongooseToJSON(mediaSchema);

mediaSchema.index({ type: 1 });
mediaSchema.index({ uploadedAt: -1 });

export const Media: mongoose.Model<IMedia> =
    mongoose.models.Media || mongoose.model<IMedia>("Media", mediaSchema);
