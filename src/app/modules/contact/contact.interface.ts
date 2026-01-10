import { Document } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    phone: string;
    message: string;
    isRead: boolean;
    isDeleted: boolean;
    createdAt: Date;
}
