import mongoose, { Schema } from "mongoose";
import { ITeamMember } from "./team.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const teamMemberSchema = new Schema<ITeamMember>(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        image: { type: String, required: true },
        bio: [{ type: String }],
        order: { type: Number, default: 0 },
        category: { type: String, enum: ["leadership", "placement"], required: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

applyMongooseToJSON(teamMemberSchema);

teamMemberSchema.index({ category: 1 });
teamMemberSchema.index({ order: 1 });
teamMemberSchema.index({ isActive: 1 });

export const TeamMember: mongoose.Model<ITeamMember> =
    mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", teamMemberSchema);
