import { Page } from "./page.model";
import { createPageValidation, togglePublishValidation, updatePageValidation } from "./page.validation";
import { asyncHandler } from "@/utils";
import { getApiErrorClass, getApiResponseClass } from "@/interface";
import status from "http-status";

const ApiError = getApiErrorClass("PAGE");
const ApiResponse = getApiResponseClass("PAGE");

export const createPage = asyncHandler(async (req, res) => {
    const validatedData = createPageValidation.parse(req.body);

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug: validatedData.slug });
    if (existingPage) {
        throw new ApiError(status.BAD_REQUEST, "Page with this slug already exists");
    }

    const page = new Page(validatedData);
    await page.save();

    res.status(status.CREATED).json(
        new ApiResponse(status.CREATED, "Page created successfully", page)
    );
});

export const getAllPages = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, isPublished, search } = req.query;

    const filter: any = { isDeleted: false };
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } },
        ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const pages = await Page.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Page.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    const result = {
        pages,
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
    };

    res.json(new ApiResponse(status.OK, "Pages retrieved successfully", result));
});

export const getPageBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const page = await Page.findOne({ slug, isDeleted: false, isPublished: true });

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page not found");
    }

    res.json(new ApiResponse(status.OK, "Page retrieved successfully", page));
});

export const getPageById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const page = await Page.findOne({ _id: id, isDeleted: false });

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page not found");
    }

    res.json(new ApiResponse(status.OK, "Page retrieved successfully", page));
});

export const updatePage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = updatePageValidation.parse(req.body);

    if (validatedData.slug) {
        const existingPage = await Page.findOne({
            slug: validatedData.slug,
            _id: { $ne: id },
        });
        if (existingPage) {
            throw new ApiError(status.BAD_REQUEST, "Page with this slug already exists");
        }
    }

    const page = await Page.findOneAndUpdate(
        { _id: id, isDeleted: false },
        validatedData,
        { new: true, runValidators: true }
    );

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page not found");
    }

    res.json(new ApiResponse(status.OK, "Page updated successfully", page));
});

export const togglePublish = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isPublished } = togglePublishValidation.parse(req.body);

    const page = await Page.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isPublished },
        { new: true }
    );

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page not found");
    }

    res.json(
        new ApiResponse(
            status.OK,
            `Page ${isPublished ? "published" : "unpublished"} successfully`,
            page
        )
    );
});

export const deletePage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const page = await Page.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page not found");
    }

    res.json(new ApiResponse(status.OK, "Page deleted successfully"));
});

export const addSection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const sectionData = req.body;

    const page = await Page.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $push: { sections: sectionData } },
        { new: true, runValidators: true }
    );

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page not found");
    }

    res.json(new ApiResponse(status.OK, "Section added successfully", page));
});

export const updateSection = asyncHandler(async (req, res) => {
    const { id, sectionId } = req.params;
    const sectionData = req.body;

    const updateObj: any = {};
    for (const key in sectionData) {
        updateObj[`sections.$.${key}`] = sectionData[key];
    }

    const page = await Page.findOneAndUpdate(
        { _id: id, "sections._id": sectionId, isDeleted: false },
        { $set: updateObj },
        { new: true, runValidators: true }
    );

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page or Section not found");
    }

    res.json(new ApiResponse(status.OK, "Section updated successfully", page));
});

export const deleteSection = asyncHandler(async (req, res) => {
    const { id, sectionId } = req.params;

    const page = await Page.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $pull: { sections: { _id: sectionId } } },
        { new: true }
    );

    if (!page) {
        throw new ApiError(status.NOT_FOUND, "Page not found");
    }

    res.json(new ApiResponse(status.OK, "Section deleted successfully", page));
});
