"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSection = exports.updateSection = exports.addSection = exports.deletePage = exports.togglePublish = exports.updatePage = exports.getPageById = exports.getPageBySlug = exports.getAllPages = exports.createPage = void 0;
const page_model_1 = require("./page.model");
const page_validation_1 = require("./page.validation");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiError = (0, interface_1.getApiErrorClass)("PAGE");
const ApiResponse = (0, interface_1.getApiResponseClass)("PAGE");
exports.createPage = (0, utils_1.asyncHandler)(async (req, res) => {
    const validatedData = page_validation_1.createPageValidation.parse(req.body);
    // Check if slug already exists
    const existingPage = await page_model_1.Page.findOne({ slug: validatedData.slug });
    if (existingPage) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Page with this slug already exists");
    }
    const page = new page_model_1.Page(validatedData);
    await page.save();
    res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "Page created successfully", page));
});
exports.getAllPages = (0, utils_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, isPublished, search } = req.query;
    const filter = { isDeleted: false };
    if (isPublished !== undefined)
        filter.isPublished = isPublished === "true";
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } },
        ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const pages = await page_model_1.Page.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));
    const total = await page_model_1.Page.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));
    const result = {
        pages,
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
    };
    res.json(new ApiResponse(http_status_1.default.OK, "Pages retrieved successfully", result));
});
exports.getPageBySlug = (0, utils_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    const page = await page_model_1.Page.findOne({ slug, isDeleted: false, isPublished: true });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Page retrieved successfully", page));
});
exports.getPageById = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const page = await page_model_1.Page.findOne({ _id: id, isDeleted: false });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Page retrieved successfully", page));
});
exports.updatePage = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const validatedData = page_validation_1.updatePageValidation.parse(req.body);
    if (validatedData.slug) {
        const existingPage = await page_model_1.Page.findOne({
            slug: validatedData.slug,
            _id: { $ne: id },
        });
        if (existingPage) {
            throw new ApiError(http_status_1.default.BAD_REQUEST, "Page with this slug already exists");
        }
    }
    const page = await page_model_1.Page.findOneAndUpdate({ _id: id, isDeleted: false }, validatedData, { new: true, runValidators: true });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Page updated successfully", page));
});
exports.togglePublish = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { isPublished } = page_validation_1.togglePublishValidation.parse(req.body);
    const page = await page_model_1.Page.findOneAndUpdate({ _id: id, isDeleted: false }, { isPublished }, { new: true });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, `Page ${isPublished ? "published" : "unpublished"} successfully`, page));
});
exports.deletePage = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const page = await page_model_1.Page.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Page deleted successfully"));
});
exports.addSection = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const sectionData = req.body;
    const page = await page_model_1.Page.findOneAndUpdate({ _id: id, isDeleted: false }, { $push: { sections: sectionData } }, { new: true, runValidators: true });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Section added successfully", page));
});
exports.updateSection = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id, sectionId } = req.params;
    const sectionData = req.body;
    const updateObj = {};
    for (const key in sectionData) {
        updateObj[`sections.$.${key}`] = sectionData[key];
    }
    const page = await page_model_1.Page.findOneAndUpdate({ _id: id, "sections._id": sectionId, isDeleted: false }, { $set: updateObj }, { new: true, runValidators: true });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page or Section not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Section updated successfully", page));
});
exports.deleteSection = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id, sectionId } = req.params;
    const page = await page_model_1.Page.findOneAndUpdate({ _id: id, isDeleted: false }, { $pull: { sections: { _id: sectionId } } }, { new: true });
    if (!page) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Page not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Section deleted successfully", page));
});
//# sourceMappingURL=page.controller.js.map