"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMapSchema = exports.AddressSectionSchema = exports.ContactFormSchema = exports.PlacementActivitiesSchema = exports.PlacementTeamSchema = exports.EmptySchema = exports.EligibilityListSchema = exports.OtherFacilitiesSchema = exports.MultiImageCarouselSchema = exports.RouteChargesSchema = exports.LabDetailsSchema = exports.InfoCardSchema = exports.LatestNewsSchema = exports.TestimonialsSchema = exports.ServicesGridSchema = exports.LeadershipGridSchema = exports.ContactCtaSchema = exports.StatsCountersSchema = exports.HostelAmenitiesSchema = exports.FeaturesGridSchema = exports.FacilitiesGridSchema = exports.QualityPolicySchema = exports.StatsSectionSchema = exports.AboutHeroSchema = exports.PageHeaderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PageHeaderSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: String,
    image: String,
    backgroundImage: String
}, { _id: false });
exports.AboutHeroSchema = new mongoose_1.Schema({
    label: String,
    title: { type: String, required: true },
    paragraphs: [String],
    imageSrc: String,
    cta: { text: String, link: String },
    reversed: Boolean
}, { _id: false });
exports.StatsSectionSchema = new mongoose_1.Schema({
    featuredImage: String,
    label: String,
    title: String,
    stats: [{ value: String, field: String }]
}, { _id: false });
exports.QualityPolicySchema = new mongoose_1.Schema({
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
exports.FacilitiesGridSchema = new mongoose_1.Schema({
    label: String,
    title: String,
    facilities: [{
            facilityName: String,
            featuredImage: String,
            ctaLink: String
        }]
}, { _id: false });
exports.FeaturesGridSchema = new mongoose_1.Schema({
    description: String,
    features: [{ icon: String, title: String, description: String }]
}, { _id: false });
exports.HostelAmenitiesSchema = new mongoose_1.Schema({
    items: [{ icon: String, text: String }]
}, { _id: false });
exports.StatsCountersSchema = new mongoose_1.Schema({
    label: String,
    title: String,
    image: String,
    stats: [{ value: String, field: String }]
}, { _id: false });
exports.ContactCtaSchema = new mongoose_1.Schema({
    title: String,
    subtitle: String,
    buttonText: String,
    buttonLink: String,
    imageSrc: String,
    backgroundImage: String
}, { _id: false });
exports.LeadershipGridSchema = new mongoose_1.Schema({
    members: [{ name: String, role: String, image: String }]
}, { _id: false });
exports.ServicesGridSchema = new mongoose_1.Schema({
    label: String,
    title: String,
    description: String,
    services: [{ icon: String, serviceTitle: String, serviceDescription: String }]
}, { _id: false });
exports.TestimonialsSchema = new mongoose_1.Schema({
    feedbacks: [{
            name: String,
            profileImage: String,
            feedbackDescription: String,
            reviewPoint: Number
        }]
}, { _id: false });
exports.LatestNewsSchema = new mongoose_1.Schema({
    articles: [{
            title: String,
            featuredImage: String,
            date: String,
            author: String,
            categories: [String]
        }]
}, { _id: false });
exports.InfoCardSchema = new mongoose_1.Schema({
    title: String,
    label: String,
    description: [String],
    featuredImage: String
}, { _id: false });
exports.LabDetailsSchema = new mongoose_1.Schema({
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
exports.RouteChargesSchema = new mongoose_1.Schema({
    label: String,
    title: String,
    description: String,
    routeCharges: [{ startLocation: String, endLocation: String, charge: String }]
}, { _id: false });
exports.MultiImageCarouselSchema = new mongoose_1.Schema({
    images: [String]
}, { _id: false });
exports.OtherFacilitiesSchema = new mongoose_1.Schema({
    gallery: [{ name: String, featured_image: String, slug: String }]
}, { _id: false });
exports.EligibilityListSchema = new mongoose_1.Schema({
    sections: [{
            title: String,
            criteria: [{ text: String }]
        }]
}, { _id: false });
exports.EmptySchema = new mongoose_1.Schema({}, { _id: false, strict: false });
exports.PlacementTeamSchema = new mongoose_1.Schema({
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
exports.PlacementActivitiesSchema = new mongoose_1.Schema({
    headerText: String,
    activities: [{ text: String }]
}, { _id: false });
exports.ContactFormSchema = new mongoose_1.Schema({
    label: String,
    title: String,
    description: [String],
    socialLinks: [{
            icon: { type: String, enum: ["facebook", "twitter", "instagram", "linkedin"] },
            url: String
        }]
}, { _id: false });
exports.AddressSectionSchema = new mongoose_1.Schema({
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
exports.GoogleMapSchema = new mongoose_1.Schema({
    googleMapEmbedUrl: String,
    src: String
}, { _id: false });
//# sourceMappingURL=section.schemas.js.map