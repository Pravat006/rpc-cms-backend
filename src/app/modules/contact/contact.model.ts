import mongoose, { Schema } from "mongoose";
import { IContact } from "./contact.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const contactSchema = new Schema<IContact>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

applyMongooseToJSON(contactSchema);

contactSchema.index({ isRead: 1 });
contactSchema.index({ createdAt: -1 });

export const Contact: mongoose.Model<IContact> =
    mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
