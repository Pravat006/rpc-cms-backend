"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderFaculty = exports.deleteFaculty = exports.updateFaculty = exports.getFacultyById = exports.getAllFaculty = exports.createFaculty = void 0;
const faculty_model_1 = require("./faculty.model");
const faculty_validation_1 = require("./faculty.validation");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiError = (0, interface_1.getApiErrorClass)("FACULTY");
const ApiResponse = (0, interface_1.getApiResponseClass)("FACULTY");
exports.createFaculty = (0, utils_1.asyncHandler)(async (req, res) => {
    const validatedData = faculty_validation_1.createFacultyValidation.parse(req.body);
    const faculty = new faculty_model_1.Faculty(validatedData);
    await faculty.save();
    res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "Faculty member added successfully", faculty));
});
exports.getAllFaculty = (0, utils_1.asyncHandler)(async (req, res) => {
    const { department, isActive, search } = req.query;
    const filter = { isDeleted: false };
    if (department)
        filter.department = department;
    if (isActive !== undefined)
        filter.isActive = isActive === "true";
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { role: { $regex: search, $options: "i" } },
        ];
    }
    const facultyList = await faculty_model_1.Faculty.find(filter)
        .sort({ order: 1, name: 1 });
    res.json(new ApiResponse(http_status_1.default.OK, "Faculty retrieved successfully", facultyList));
});
exports.getFacultyById = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const faculty = await faculty_model_1.Faculty.findOne({ _id: id, isDeleted: false });
    if (!faculty) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Faculty member not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Faculty member retrieved successfully", faculty));
});
exports.updateFaculty = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const validatedData = faculty_validation_1.updateFacultyValidation.parse(req.body);
    const faculty = await faculty_model_1.Faculty.findOneAndUpdate({ _id: id, isDeleted: false }, validatedData, { new: true, runValidators: true });
    if (!faculty) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Faculty member not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Faculty member updated successfully", faculty));
});
exports.deleteFaculty = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const faculty = await faculty_model_1.Faculty.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!faculty) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Faculty member not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Faculty member deleted successfully"));
});
exports.reorderFaculty = (0, utils_1.asyncHandler)(async (req, res) => {
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
    await faculty_model_1.Faculty.bulkWrite(bulkOps);
    res.json(new ApiResponse(http_status_1.default.OK, "Faculty reordered successfully"));
});
//# sourceMappingURL=faculty.controller.js.map