import mongoose, { Schema } from "mongoose";
import { IPage } from "./page.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";
import {
    AboutHeroSchema, AddressSectionSchema, ContactCtaSchema, ContactFormSchema, EligibilityListSchema, EmptySchema,
    FacilitiesGridSchema, FeaturesGridSchema, GoogleMapSchema, HostelAmenitiesSchema, InfoCardSchema, LabDetailsSchema,
    LatestNewsSchema, LeadershipGridSchema, MultiImageCarouselSchema, OtherFacilitiesSchema, PageHeaderSchema,
    PlacementActivitiesSchema, PlacementTeamSchema, QualityPolicySchema, RouteChargesSchema, ServicesGridSchema,
    StatsCountersSchema, StatsSectionSchema, TestimonialsSchema
} from "./section.schemas";

const baseSectionSchema = new Schema(
    {
        type: { type: String, required: true },
        title: { type: String },
        adminLabel: { type: String },
        order: { type: Number, required: true },
        settings: {
            hideHeader: { type: Boolean },
            reversed: { type: Boolean },
            background: { type: String, enum: ["white", "gray", "primary"] },
        },
    },
    { discriminatorKey: 'type', _id: true }
);

const pageSchema = new Schema<IPage>(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        metaDescription: { type: String },
        backgroundImage: { type: String, required: true },
        sections: [baseSectionSchema],
        isPublished: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Define discriminators for the sections array
const sectionsArray = pageSchema.path('sections') as mongoose.Schema.Types.DocumentArray;


const createDiscriminator = (name: string, dataSchema: Schema) => {
    sectionsArray.discriminator(name, new Schema({ data: dataSchema }, { _id: false }));
};

createDiscriminator("page-header", PageHeaderSchema);
createDiscriminator("about-hero", AboutHeroSchema);
createDiscriminator("stats-section", StatsSectionSchema);
createDiscriminator("quality-policy", QualityPolicySchema);
createDiscriminator("facilities-grid", FacilitiesGridSchema);
createDiscriminator("features-grid", FeaturesGridSchema);
createDiscriminator("amenities-grid", HostelAmenitiesSchema);
createDiscriminator("stats-counters", StatsCountersSchema);
createDiscriminator("contact-cta", ContactCtaSchema);
createDiscriminator("leadership-grid", LeadershipGridSchema);
createDiscriminator("services-grid", ServicesGridSchema);
createDiscriminator("testimonials", TestimonialsSchema);
createDiscriminator("latest-news", LatestNewsSchema);
createDiscriminator("info-card", InfoCardSchema);
createDiscriminator("lab-details", LabDetailsSchema);
createDiscriminator("route-charges", RouteChargesSchema);
createDiscriminator("multi-image-carousel", MultiImageCarouselSchema);
createDiscriminator("other-facilities-carousel", OtherFacilitiesSchema);
createDiscriminator("eligibility-list", EligibilityListSchema);
createDiscriminator("placement-team", PlacementTeamSchema);
createDiscriminator("placement-activities", PlacementActivitiesSchema);
createDiscriminator("contact-form", ContactFormSchema);
createDiscriminator("address-section", AddressSectionSchema);
createDiscriminator("google-map", GoogleMapSchema);

// Generic/Empty fallbacks for others or generic types
createDiscriminator("gallery-grid", EmptySchema);
createDiscriminator("post-grid", EmptySchema);
createDiscriminator("faculty-grid", EmptySchema);
createDiscriminator("other-facilities", OtherFacilitiesSchema); // alias
createDiscriminator("hero-slider", EmptySchema); // or specific if needed

applyMongooseToJSON(pageSchema);

pageSchema.index({ slug: 1 }, { unique: true });
pageSchema.index({ isPublished: 1 });
pageSchema.index({ createdAt: -1 });

export const Page: mongoose.Model<IPage> =
    mongoose.models.Page || mongoose.model<IPage>("Page", pageSchema);
