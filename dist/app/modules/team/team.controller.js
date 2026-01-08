"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderTeamMembers = exports.deleteTeamMember = exports.updateTeamMember = exports.getTeamMemberById = exports.getAllTeamMembers = exports.createTeamMember = void 0;
const team_model_1 = require("./team.model");
const team_validation_1 = require("./team.validation");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiError = (0, interface_1.getApiErrorClass)("TEAM");
const ApiResponse = (0, interface_1.getApiResponseClass)("TEAM");
exports.createTeamMember = (0, utils_1.asyncHandler)(async (req, res) => {
    const validatedData = team_validation_1.createTeamMemberValidation.parse(req.body);
    const teamMember = new team_model_1.TeamMember(validatedData);
    await teamMember.save();
    res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "Team member added successfully", teamMember));
});
exports.getAllTeamMembers = (0, utils_1.asyncHandler)(async (req, res) => {
    const { category, isActive, search } = req.query;
    const filter = { isDeleted: false };
    if (category)
        filter.category = category;
    if (isActive !== undefined)
        filter.isActive = isActive === "true";
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { role: { $regex: search, $options: "i" } },
        ];
    }
    const teamMembers = await team_model_1.TeamMember.find(filter)
        .sort({ order: 1, name: 1 });
    res.json(new ApiResponse(http_status_1.default.OK, "Team members retrieved successfully", teamMembers));
});
exports.getTeamMemberById = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const teamMember = await team_model_1.TeamMember.findOne({ _id: id, isDeleted: false });
    if (!teamMember) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Team member not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Team member retrieved successfully", teamMember));
});
exports.updateTeamMember = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const validatedData = team_validation_1.updateTeamMemberValidation.parse(req.body);
    const teamMember = await team_model_1.TeamMember.findOneAndUpdate({ _id: id, isDeleted: false }, validatedData, { new: true, runValidators: true });
    if (!teamMember) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Team member not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Team member updated successfully", teamMember));
});
exports.deleteTeamMember = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const teamMember = await team_model_1.TeamMember.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!teamMember) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Team member not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Team member deleted successfully"));
});
exports.reorderTeamMembers = (0, utils_1.asyncHandler)(async (req, res) => {
    const { orders } = req.body; // Array of { id: string, order: number }
    if (!Array.isArray(orders)) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Orders must be an array");
    }
    const bulkOps = orders.map((item) => ({
        updateOne: {
            filter: { _id: item.id },
            update: { order: item.order },
        },
    }));
    await team_model_1.TeamMember.bulkWrite(bulkOps);
    res.json(new ApiResponse(http_status_1.default.OK, "Team reordered successfully"));
});
//# sourceMappingURL=team.controller.js.map