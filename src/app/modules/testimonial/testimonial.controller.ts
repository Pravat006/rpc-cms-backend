import { Testimonial } from "./testimonial.model";
import { createTestimonialValidation, updateTestimonialValidation } from "./testimonial.validation";
import { asyncHandler } from "../../utils/asyncHandler";
import { getApiErrorClass } from "../../interface/apiError";
import { getApiResponseClass } from "../../interface/apiResponse";
import status from "http-status";

const ApiError = getApiErrorClass("TESTIMONIAL");
const ApiResponse = getApiResponseClass("TESTIMONIAL");

export const createTestimonial = asyncHandler(async (req, res) => {
    const validatedData = createTestimonialValidation.parse(req.body);

    const testimonial = new Testimonial(validatedData);
    await testimonial.save();

    res.status(status.CREATED).json(
        new ApiResponse(status.CREATED, "Testimonial created successfully", testimonial)
    );
});

export const getAllTestimonials = asyncHandler(async (req, res) => {
    const { isPublished } = req.query;

    const filter: any = { isDeleted: false };
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";

    const testimonials = await Testimonial.find(filter)
        .sort({ order: 1, createdAt: -1 });

    res.json(new ApiResponse(status.OK, "Testimonials retrieved successfully", testimonials));
});

export const getTestimonialById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findOne({ _id: id, isDeleted: false });

    if (!testimonial) {
        throw new ApiError(status.NOT_FOUND, "Testimonial not found");
    }

    res.json(new ApiResponse(status.OK, "Testimonial retrieved successfully", testimonial));
});

export const updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = updateTestimonialValidation.parse(req.body);

    const testimonial = await Testimonial.findOneAndUpdate(
        { _id: id, isDeleted: false },
        validatedData,
        { new: true, runValidators: true }
    );

    if (!testimonial) {
        throw new ApiError(status.NOT_FOUND, "Testimonial not found");
    }

    res.json(new ApiResponse(status.OK, "Testimonial updated successfully", testimonial));
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!testimonial) {
        throw new ApiError(status.NOT_FOUND, "Testimonial not found");
    }

    res.json(new ApiResponse(status.OK, "Testimonial deleted successfully"));
});

export const reorderTestimonials = asyncHandler(async (req, res) => {
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

    await Testimonial.bulkWrite(bulkOps);

    res.json(new ApiResponse(status.OK, "Testimonials reordered successfully"));
});
