import { Faculty } from "./faculty.model";
import { createFacultyValidation, updateFacultyValidation } from "./faculty.validation";
import { asyncHandler } from "@/utils";
import { getApiErrorClass, getApiResponseClass } from "@/interface";
import status from "http-status";

const ApiError = getApiErrorClass("FACULTY");
const ApiResponse = getApiResponseClass("FACULTY");

export const createFaculty = asyncHandler(async (req, res) => {
    const validatedData = createFacultyValidation.parse(req.body);

    const faculty = new Faculty(validatedData);
    await faculty.save();

    res.status(status.CREATED).json(
        new ApiResponse(status.CREATED, "Faculty member added successfully", faculty)
    );
});

export const getAllFaculty = asyncHandler(async (req, res) => {
    const { department, isActive, search } = req.query;

    const filter: any = { isDeleted: false };
    if (department) filter.department = department;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { role: { $regex: search, $options: "i" } },
        ];
    }

    const facultyList = await Faculty.find(filter)
        .sort({ order: 1, name: 1 });

    res.json(new ApiResponse(status.OK, "Faculty retrieved successfully", facultyList));
});

export const getFacultyById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const faculty = await Faculty.findOne({ _id: id, isDeleted: false });

    if (!faculty) {
        throw new ApiError(status.NOT_FOUND, "Faculty member not found");
    }

    res.json(new ApiResponse(status.OK, "Faculty member retrieved successfully", faculty));
});

export const updateFaculty = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = updateFacultyValidation.parse(req.body);

    const faculty = await Faculty.findOneAndUpdate(
        { _id: id, isDeleted: false },
        validatedData,
        { new: true, runValidators: true }
    );

    if (!faculty) {
        throw new ApiError(status.NOT_FOUND, "Faculty member not found");
    }

    res.json(new ApiResponse(status.OK, "Faculty member updated successfully", faculty));
});

export const deleteFaculty = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const faculty = await Faculty.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!faculty) {
        throw new ApiError(status.NOT_FOUND, "Faculty member not found");
    }

    res.json(new ApiResponse(status.OK, "Faculty member deleted successfully"));
});

export const reorderFaculty = asyncHandler(async (req, res) => {
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

    await Faculty.bulkWrite(bulkOps);

    res.json(new ApiResponse(status.OK, "Faculty reordered successfully"));
});
