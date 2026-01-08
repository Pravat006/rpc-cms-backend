import mongoose, { Schema } from "mongoose";
import { IFaculty } from "./faculty.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const facultySchema = new Schema<IFaculty>(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        department: { type: String, required: true },
        profileImage: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        experience: { type: String },
        qualifications: [{ type: String }],
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

applyMongooseToJSON(facultySchema);

facultySchema.index({ department: 1 });
facultySchema.index({ isActive: 1 });
facultySchema.index({ order: 1 });

export const Faculty: mongoose.Model<IFaculty> =
    mongoose.models.Faculty || mongoose.model<IFaculty>("Faculty", facultySchema);
