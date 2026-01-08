import { Document, Types } from "mongoose";

export interface IMedia extends Document {
    filename: string;
    url: string;
    publicId: string;
    type: "image" | "video" | "document";
    mimeType: string;
    size: number;
    uploadedBy: Types.ObjectId;
    uploadedAt: Date;
}
