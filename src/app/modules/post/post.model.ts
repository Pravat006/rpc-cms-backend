import mongoose, { Schema } from "mongoose";
import { IPost } from "./post.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const postSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        content: { type: String },
        excerpt: { type: String },
        category: { type: String, enum: ["blog", "admission", "news"], required: true },
        publishDate: { type: Date, default: Date.now },
        author: { type: String },
        tags: [{ type: String }],
        isPublished: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

applyMongooseToJSON(postSchema);

postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ category: 1 });
postSchema.index({ isPublished: 1 });
postSchema.index({ publishDate: -1 });

export const Post: mongoose.Model<IPost> =
    mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);
