import { TeamMember } from "./team.model";
import { createTeamMemberValidation, updateTeamMemberValidation } from "./team.validation";
import { asyncHandler } from "@/utils";
import { getApiErrorClass, getApiResponseClass } from "@/interface";
import status from "http-status";

const ApiError = getApiErrorClass("TEAM");
const ApiResponse = getApiResponseClass("TEAM");

export const createTeamMember = asyncHandler(async (req, res) => {
    const validatedData = createTeamMemberValidation.parse(req.body);

    const teamMember = new TeamMember(validatedData);
    await teamMember.save();

    res.status(status.CREATED).json(
        new ApiResponse(status.CREATED, "Team member added successfully", teamMember)
    );
});

export const getAllTeamMembers = asyncHandler(async (req, res) => {
    const { category, isActive, search } = req.query;

    const filter: any = { isDeleted: false };
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { role: { $regex: search, $options: "i" } },
        ];
    }

    const teamMembers = await TeamMember.find(filter)
        .sort({ order: 1, name: 1 });

    res.json(new ApiResponse(status.OK, "Team members retrieved successfully", teamMembers));
});

export const getTeamMemberById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const teamMember = await TeamMember.findOne({ _id: id, isDeleted: false });

    if (!teamMember) {
        throw new ApiError(status.NOT_FOUND, "Team member not found");
    }

    res.json(new ApiResponse(status.OK, "Team member retrieved successfully", teamMember));
});

export const updateTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = updateTeamMemberValidation.parse(req.body);

    const teamMember = await TeamMember.findOneAndUpdate(
        { _id: id, isDeleted: false },
        validatedData,
        { new: true, runValidators: true }
    );

    if (!teamMember) {
        throw new ApiError(status.NOT_FOUND, "Team member not found");
    }

    res.json(new ApiResponse(status.OK, "Team member updated successfully", teamMember));
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const teamMember = await TeamMember.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!teamMember) {
        throw new ApiError(status.NOT_FOUND, "Team member not found");
    }

    res.json(new ApiResponse(status.OK, "Team member deleted successfully"));
});

export const reorderTeamMembers = asyncHandler(async (req, res) => {
    const { orders } = req.body; // Array of { id: string, order: number }

    if (!Array.isArray(orders)) {
        throw new ApiError(status.BAD_REQUEST, "Orders must be an array");
    }

    const bulkOps = orders.map((item) => ({
        updateOne: {
            filter: { _id: item.id },
            update: { order: item.order },
        },
    }));

    await TeamMember.bulkWrite(bulkOps);

    res.json(new ApiResponse(status.OK, "Team reordered successfully"));
});
