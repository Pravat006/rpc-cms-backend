import { Document } from "mongoose";

export interface IGalleryImage extends Document {
    url: string;
    alt: string;
    caption?: string;
    album?: string;
    order: number;
    uploadedAt: Date;
}
