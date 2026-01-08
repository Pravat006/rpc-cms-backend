import mongoose, { Schema } from "mongoose";
import { ITestimonial } from "./testimonial.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const testimonialSchema = new Schema<ITestimonial>(
    {
        name: { type: String, required: true },
        profileImage: { type: String, required: true },
        feedback: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, default: 5 },
        order: { type: Number, default: 0 },
        isPublished: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

applyMongooseToJSON(testimonialSchema);

testimonialSchema.index({ isPublished: 1 });
testimonialSchema.index({ order: 1 });

export const Testimonial: mongoose.Model<ITestimonial> =
    mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
