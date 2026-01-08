"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPostBySlug = exports.getAllPosts = exports.createPost = void 0;
const post_model_1 = require("./post.model");
const post_validation_1 = require("./post.validation");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiError = (0, interface_1.getApiErrorClass)("POST");
const ApiResponse = (0, interface_1.getApiResponseClass)("POST");
exports.createPost = (0, utils_1.asyncHandler)(async (req, res) => {
    const validatedData = post_validation_1.createPostValidation.parse(req.body);
    const existingPost = await post_model_1.Post.findOne({ slug: validatedData.slug });
    if (existingPost) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "Post with this slug already exists");
    }
    const post = new post_model_1.Post(validatedData);
    await post.save();
    res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "Post created successfully", post));
});
exports.getAllPosts = (0, utils_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, category, isPublished, search } = req.query;
    const filter = { isDeleted: false };
    if (category)
        filter.category = category;
    if (isPublished !== undefined)
        filter.isPublished = isPublished === "true";
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const posts = await post_model_1.Post.find(filter)
        .sort({ publishDate: -1 })
        .skip(skip)
        .limit(Number(limit));
    const total = await post_model_1.Post.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));
    const result = {
        posts,
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
    };
    res.json(new ApiResponse(http_status_1.default.OK, "Posts retrieved successfully", result));
});
exports.getPostBySlug = (0, utils_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    const post = await post_model_1.Post.findOne({ slug, isDeleted: false });
    if (!post) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Post not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Post retrieved successfully", post));
});
exports.getPostById = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const post = await post_model_1.Post.findOne({ _id: id, isDeleted: false });
    if (!post) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Post not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Post retrieved successfully", post));
});
exports.updatePost = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const validatedData = post_validation_1.updatePostValidation.parse(req.body);
    if (validatedData.slug) {
        const existingPost = await post_model_1.Post.findOne({
            slug: validatedData.slug,
            _id: { $ne: id },
        });
        if (existingPost) {
            throw new ApiError(http_status_1.default.BAD_REQUEST, "Post with this slug already exists");
        }
    }
    const post = await post_model_1.Post.findOneAndUpdate({ _id: id, isDeleted: false }, validatedData, { new: true, runValidators: true });
    if (!post) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Post not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Post updated successfully", post));
});
exports.deletePost = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const post = await post_model_1.Post.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!post) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Post not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Post deleted successfully"));
});
//# sourceMappingURL=post.controller.js.map