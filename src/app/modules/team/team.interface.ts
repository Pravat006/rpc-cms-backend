import { Document } from "mongoose";

export interface ITeamMember extends Document {
    name: string;
    role: string;
    image: string;
    bio?: string[];
    order: number;
    category: "leadership" | "placement";
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
