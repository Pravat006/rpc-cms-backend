import { Document } from "mongoose";

export interface IPost extends Document {
    title: string;
    slug: string;
    image: string;
    content?: string;
    excerpt?: string;
    category: "blog" | "admission" | "news";
    publishDate: Date;
    author?: string;
    tags?: string[];
    isPublished: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
