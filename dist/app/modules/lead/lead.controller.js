"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLeadStatus = exports.getAllLeads = exports.createLead = void 0;
const lead_model_1 = require("./lead.model");
const lead_validation_1 = require("./lead.validation");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiError = (0, interface_1.getApiErrorClass)("LEAD");
const ApiResponse = (0, interface_1.getApiResponseClass)("LEAD");
exports.createLead = (0, utils_1.asyncHandler)(async (req, res) => {
    const validatedData = lead_validation_1.createLeadValidation.parse(req.body);
    const lead = new lead_model_1.Lead(validatedData);
    await lead.save();
    // Invalidate admin cache only (REMOVED)
    res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "Message sent successfully", lead));
});
exports.getAllLeads = (0, utils_1.asyncHandler)(async (req, res) => {
    const { status: leadStatus, page = 1, limit = 10 } = req.query;
    // Redis caching removed for admin routes
    const filter = {};
    if (leadStatus)
        filter.status = leadStatus;
    const skip = (Number(page) - 1) * Number(limit);
    const leads = await lead_model_1.Lead.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));
    const total = await lead_model_1.Lead.countDocuments(filter);
    const result = {
        leads,
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
    };
    // Caching removed
    res.json(new ApiResponse(http_status_1.default.OK, "Leads retrieved successfully", result));
});
exports.updateLeadStatus = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { status: newStatus } = lead_validation_1.updateLeadStatusValidation.parse(req.body);
    const lead = await lead_model_1.Lead.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    if (!lead) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Lead not found");
    }
    // Invalidation removed
    res.json(new ApiResponse(http_status_1.default.OK, "Lead status updated successfully", lead));
});
exports.deleteLead = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const lead = await lead_model_1.Lead.findByIdAndDelete(id);
    if (!lead) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Lead not found");
    }
    // Invalidation removed
    res.json(new ApiResponse(http_status_1.default.OK, "Lead deleted successfully"));
});
//# sourceMappingURL=lead.controller.js.map