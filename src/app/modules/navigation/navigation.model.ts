import mongoose, { Schema } from "mongoose";
import { INavigation, INavigationItem } from "./navigation.interface";
import applyMongooseToJSON from "../../utils/mongooseToJSON";

const navigationItemSchema = new Schema<INavigationItem>({
    label: { type: String, required: true },
    type: { type: String, enum: ['link', 'dropdown'], required: true },
    path: { type: String },
    page: { type: Schema.Types.ObjectId, ref: 'Page' },
    order: { type: Number, required: true },
});

// Allow recursive children
navigationItemSchema.add({
    children: [navigationItemSchema]
});

const navigationSchema = new Schema<INavigation>(
    {
        menu: [navigationItemSchema],
    },
    {
        timestamps: true,
    }
);

applyMongooseToJSON(navigationSchema);

export const Navigation = mongoose.models.Navigation || mongoose.model<INavigation>("Navigation", navigationSchema);
