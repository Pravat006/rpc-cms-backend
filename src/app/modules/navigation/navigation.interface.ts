import { Document, Types } from "mongoose";

export interface INavigationItem {
    label: string;
    type: 'link' | 'dropdown';
    path?: string; // For static links or populated from Page
    page?: Types.ObjectId; // Reference to a Page
    children?: INavigationItem[];
    order: number;
}

export interface INavigation extends Document {
    menu: INavigationItem[];
    createdAt: Date;
    updatedAt: Date;
}
