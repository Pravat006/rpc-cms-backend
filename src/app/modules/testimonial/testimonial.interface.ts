import { Document } from "mongoose";

export interface ITestimonial extends Document {
    name: string;
    profileImage: string;
    feedback: string;
    rating: number;
    order: number;
    isPublished: boolean;
    isDeleted: boolean;
    createdAt: Date;
}
