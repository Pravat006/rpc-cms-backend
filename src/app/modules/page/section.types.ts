export interface PageHeaderData {
    title: string;
    subtitle?: string;
    image: string;
    backgroundImage?: string;
}

export interface AboutHeroData {
    label?: string;
    title: string;
    paragraphs: string[];
    imageSrc: string;
    cta?: { text: string; link: string };
    reversed?: boolean;
}

export interface StatsSectionData {
    featuredImage?: string;
    label?: string;
    stats: { value: string; field: string }[];
}

export interface QualityPolicyData {
    imageSrc?: string;
    policy: {
        subtitle: string;
        title: string;
        description: string[];
    };
    visionMission: {
        title: string;
        description: string;
    }[];
}

export interface FacilitiesGridData {
    label?: string;
    title?: string;
    facilities: {
        facilityName: string;
        featuredImage: string;
        ctaLink: string;
    }[];
}

// Timeline/History (not used?)

export interface FeaturesGridData {
    description?: string;
    features: { icon: string; title: string; description: string }[];
}

export interface HostelAmenitiesData {
    label?: string;
    title?: string;
    amenities: { icon: string; name: string }[];
}

export interface StatsCountersData {
    image?: string;
    stats: { value: string; field: string }[];
}

export interface ContactCtaData {
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonLink: string;
    imageSrc?: string;
    backgroundImage?: string;
}

export interface LeadershipGridData {
    members?: { name: string; role: string; image: string }[];
}

export interface ServicesGridData {
    title?: string;
    description?: string;
    services: { icon: string; serviceTitle: string; serviceDescription: string }[];
}

export interface TestimonialsData {
    feedbacks: {
        name: string;
        profileImage: string;
        feedbackDescription: string;
        reviewPoint: number;
    }[];
}

export interface LatestNewsData {
    articles: {
        title: string;
        featuredImage: string;
        date: string;
        author: string;
        categories: string[];
    }[];
}

export interface InfoCardData {
    title: string;
    label?: string;
    description: string[];
    featuredImage: string;
}

export interface LabDetailsData {
    label?: string;
    title?: string;
    items?: { title: string; description: string[] }[];
    images?: { image: string; name: string }[];
}

export interface RouteChargesData {
    label?: string;
    title?: string;
    description?: string;
    routeCharges: { startLocation: string; endLocation: string; charge: string }[];
}

export interface MultiImageCarouselData {
    images: string[];
}

export interface OtherFacilitiesData {
    gallery: { name: string; featured_image: string; slug: string }[];
}

export interface EligibilityListData {
    sections: {
        title: string;
        criteria: { text: string }[];
    }[];
}

// Empty Data Sections (handled by component or other logic)
export interface EmptyData { }

export interface PlacementTeamData {
    label?: string;
    title?: string;
    description?: string[];
    members?: {
        name: string;
        role: string;
        profileImage?: string;
        email?: string;
        phone?: string;
    }[];
}

export interface PlacementActivitiesData {
    headerText?: string;
    activities: { text: string }[];
}

export interface ContactFormData {
    label?: string;
    title?: string;
    description?: string[];
    socialLinks?: {
        icon: "facebook" | "twitter" | "instagram" | "linkedin";
        url: string;
    }[];
}

export interface AddressSectionData {
    label?: string;
    title?: string;
    contacts: {
        iconType: "EMAIL" | "CALL" | "LOCATION";
        label: string;
        values: string[];
    }[];
    // Legacy support (optional)
    address?: string;
    phone?: string;
    email?: string;
}

export interface GoogleMapData {
    googleMapEmbedUrl?: string; // standardized
    src?: string; // legacy support
}

export type SectionData =
    | PageHeaderData
    | AboutHeroData
    | StatsSectionData
    | QualityPolicyData
    | FacilitiesGridData
    | FeaturesGridData
    | HostelAmenitiesData
    | StatsCountersData
    | ContactCtaData
    | LeadershipGridData
    | ServicesGridData
    | TestimonialsData
    | LatestNewsData
    | InfoCardData
    | LabDetailsData
    | RouteChargesData
    | MultiImageCarouselData
    | OtherFacilitiesData
    | EligibilityListData
    | EmptyData
    | PlacementTeamData
    | PlacementActivitiesData
    | ContactFormData
    | AddressSectionData
    | GoogleMapData;
