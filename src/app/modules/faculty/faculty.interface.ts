import { Document } from "mongoose";

export interface IFaculty extends Document {
    name: string;
    role: string;
    department: string;
    profileImage: string;
    email?: string;
    phone?: string;
    experience?: string;
    qualifications: string[];
    order: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
