import { Schema } from "mongoose";

export const PageHeaderSchema = new Schema({
    title: { type: String, required: true },
    subtitle: String,
    image: String,
    backgroundImage: String
}, { _id: false });

export const AboutHeroSchema = new Schema({
    label: String,
    title: { type: String, required: true },
    paragraphs: [String],
    imageSrc: String,
    cta: { text: String, link: String },
    reversed: Boolean
}, { _id: false });

export const StatsSectionSchema = new Schema({
    featuredImage: String,
    label: String,
    title: String,
    stats: [{ value: String, field: String }]
}, { _id: false });

export const QualityPolicySchema = new Schema({
    imageSrc: String,
    policy: {
        subtitle: String,
        title: String,
        description: [String]
    },
    visionMission: [{
        title: String,
        description: String
    }]
}, { _id: false });

export const FacilitiesGridSchema = new Schema({
    label: String,
    title: String,
    facilities: [{
        facilityName: String,
        featuredImage: String,
        ctaLink: String
    }]
}, { _id: false });

export const FeaturesGridSchema = new Schema({
    description: String,
    features: [{ icon: String, title: String, description: String }]
}, { _id: false });

export const HostelAmenitiesSchema = new Schema({
    label: String,
    title: String,
    amenities: [{ icon: String, name: String }]
}, { _id: false });

export const StatsCountersSchema = new Schema({
    label: String,
    title: String,
    image: String,
    stats: [{ value: String, field: String }]
}, { _id: false });

export const ContactCtaSchema = new Schema({
    title: String,
    subtitle: String,
    buttonText: String,
    buttonLink: String,
    imageSrc: String,
    backgroundImage: String
}, { _id: false });

export const LeadershipGridSchema = new Schema({
    members: [{ name: String, role: String, image: String }]
}, { _id: false });

export const ServicesGridSchema = new Schema({
    label: String,
    title: String,
    description: String,
    services: [{ icon: String, serviceTitle: String, serviceDescription: String }]
}, { _id: false });

export const TestimonialsSchema = new Schema({
    feedbacks: [{
        name: String,
        profileImage: String,
        feedbackDescription: String,
        reviewPoint: Number
    }]
}, { _id: false });

export const LatestNewsSchema = new Schema({
    articles: [{
        title: String,
        featuredImage: String,
        date: String,
        author: String,
        categories: [String]
    }]
}, { _id: false });

export const InfoCardSchema = new Schema({
    title: String,
    label: String,
    description: [String],
    featuredImage: String
}, { _id: false });

export const LabDetailsSchema = new Schema({
    label: String,
    title: String,
    items: [{
        title: String,
        description: [String]
    }],
    images: [{
        image: String,
        name: String
    }]
}, { _id: false });

export const RouteChargesSchema = new Schema({
    label: String,
    title: String,
    description: String,
    routeCharges: [{ startLocation: String, endLocation: String, charge: String }]
}, { _id: false });

export const MultiImageCarouselSchema = new Schema({
    images: [String]
}, { _id: false });

export const OtherFacilitiesSchema = new Schema({
    gallery: [{ name: String, featured_image: String, slug: String }]
}, { _id: false });

export const EligibilityListSchema = new Schema({
    sections: [{
        title: String,
        criteria: [{ text: String }]
    }]
}, { _id: false });

export const EmptySchema = new Schema({}, { _id: false, strict: false });

export const PlacementTeamSchema = new Schema({
    label: String,
    title: String,
    description: [String],
    members: [{
        name: String,
        role: String,
        profileImage: String,
        email: String,
        phone: String
    }]
}, { _id: false });

export const PlacementActivitiesSchema = new Schema({
    headerText: String,
    activities: [{ text: String }]
}, { _id: false });

export const ContactFormSchema = new Schema({
    label: String,
    title: String,
    description: [String],
    socialLinks: [{
        icon: { type: String, enum: ["facebook", "twitter", "instagram", "linkedin"] },
        url: String
    }]
}, { _id: false });

export const AddressSectionSchema = new Schema({
    label: String,
    title: String,
    contacts: [{
        iconType: { type: String, enum: ["EMAIL", "CALL", "LOCATION"] },
        label: String,
        values: [String]
    }],
    address: String,
    phone: String,
    email: String
}, { _id: false });

export const GoogleMapSchema = new Schema({
    googleMapEmbedUrl: String,
    src: String
}, { _id: false });
