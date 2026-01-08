import { Document, Types } from "mongoose";

export interface INavigationItem {
    label: string;
    url: string;
    order: number;
    isExternal: boolean;
    parentId?: Types.ObjectId;
    children?: INavigationItem[];
}

export interface IGlobalSettings extends Document {
    // Site Identity
    siteName: string;
    location: string;
    logo: string;
    logoAlt: string;

    // Contact Information
    contact: {
        phones: string[];
        emails: string[];
        address: {
            title: string;
            lines: string[];
        };
    };

    // Social Links
    socialLinks: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };

    // Header CTA
    ctaButtonLabel: string;
    ctaButtonUrl: string;

    // Navigation Menus
    menus: {
        header: INavigationItem[];
        footerQuickLinks: INavigationItem[];
        footerSecondary: INavigationItem[];
    };

    createdAt: Date;
    updatedAt: Date;
}
