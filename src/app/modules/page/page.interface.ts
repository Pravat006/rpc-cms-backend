import { Document, Types } from "mongoose";
import { SectionData } from "./section.types";

export interface ISection {
    _id?: Types.ObjectId;
    type: string;
    title?: string;
    adminLabel?: string;
    order: number;
    data: SectionData;
    settings?: {
        hideHeader?: boolean;
        reversed?: boolean;
        background?: "white" | "gray" | "primary";
    };
}

export interface IPage extends Document {
    slug: string;
    title: string;
    metaDescription?: string;
    backgroundImage: string;
    sections: ISection[];
    isPublished: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
