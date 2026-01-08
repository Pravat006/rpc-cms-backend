"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderTestimonials = exports.deleteTestimonial = exports.updateTestimonial = exports.getTestimonialById = exports.getAllTestimonials = exports.createTestimonial = void 0;
const testimonial_model_1 = require("./testimonial.model");
const testimonial_validation_1 = require("./testimonial.validation");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiError_1 = require("../../interface/apiError");
const apiResponse_1 = require("../../interface/apiResponse");
const http_status_1 = __importDefault(require("http-status"));
const ApiError = (0, apiError_1.getApiErrorClass)("TESTIMONIAL");
const ApiResponse = (0, apiResponse_1.getApiResponseClass)("TESTIMONIAL");
exports.createTestimonial = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const validatedData = testimonial_validation_1.createTestimonialValidation.parse(req.body);
    const testimonial = new testimonial_model_1.Testimonial(validatedData);
    await testimonial.save();
    res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "Testimonial created successfully", testimonial));
});
exports.getAllTestimonials = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { isPublished } = req.query;
    const filter = { isDeleted: false };
    if (isPublished !== undefined)
        filter.isPublished = isPublished === "true";
    const testimonials = await testimonial_model_1.Testimonial.find(filter)
        .sort({ order: 1, createdAt: -1 });
    res.json(new ApiResponse(http_status_1.default.OK, "Testimonials retrieved successfully", testimonials));
});
exports.getTestimonialById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const testimonial = await testimonial_model_1.Testimonial.findOne({ _id: id, isDeleted: false });
    if (!testimonial) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Testimonial not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Testimonial retrieved successfully", testimonial));
});
exports.updateTestimonial = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const validatedData = testimonial_validation_1.updateTestimonialValidation.parse(req.body);
    const testimonial = await testimonial_model_1.Testimonial.findOneAndUpdate({ _id: id, isDeleted: false }, validatedData, { new: true, runValidators: true });
    if (!testimonial) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Testimonial not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Testimonial updated successfully", testimonial));
});
exports.deleteTestimonial = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const testimonial = await testimonial_model_1.Testimonial.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!testimonial) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Testimonial not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Testimonial deleted successfully"));
});
exports.reorderTestimonials = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
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
    await testimonial_model_1.Testimonial.bulkWrite(bulkOps);
    res.json(new ApiResponse(http_status_1.default.OK, "Testimonials reordered successfully"));
});
//# sourceMappingURL=testimonial.controller.js.map