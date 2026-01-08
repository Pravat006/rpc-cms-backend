import { Post } from "./post.model";
import { createPostValidation, updatePostValidation } from "./post.validation";
import { asyncHandler } from "@/utils";
import { getApiErrorClass, getApiResponseClass } from "@/interface";
import status from "http-status";

const ApiError = getApiErrorClass("POST");
const ApiResponse = getApiResponseClass("POST");

export const createPost = asyncHandler(async (req, res) => {
    const validatedData = createPostValidation.parse(req.body);

    const existingPost = await Post.findOne({ slug: validatedData.slug });
    if (existingPost) {
        throw new ApiError(status.BAD_REQUEST, "Post with this slug already exists");
    }

    const post = new Post(validatedData);
    await post.save();

    res.status(status.CREATED).json(
        new ApiResponse(status.CREATED, "Post created successfully", post)
    );
});

export const getAllPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, category, isPublished, search } = req.query;

    const filter: any = { isDeleted: false };
    if (category) filter.category = category;
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await Post.find(filter)
        .sort({ publishDate: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Post.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    const result = {
        posts,
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
    };

    res.json(new ApiResponse(status.OK, "Posts retrieved successfully", result));
});

export const getPostBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const post = await Post.findOne({ slug, isDeleted: false });

    if (!post) {
        throw new ApiError(status.NOT_FOUND, "Post not found");
    }

    res.json(new ApiResponse(status.OK, "Post retrieved successfully", post));
});

export const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findOne({ _id: id, isDeleted: false });

    if (!post) {
        throw new ApiError(status.NOT_FOUND, "Post not found");
    }

    res.json(new ApiResponse(status.OK, "Post retrieved successfully", post));
});

export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = updatePostValidation.parse(req.body);

    if (validatedData.slug) {
        const existingPost = await Post.findOne({
            slug: validatedData.slug,
            _id: { $ne: id },
        });
        if (existingPost) {
            throw new ApiError(status.BAD_REQUEST, "Post with this slug already exists");
        }
    }

    const post = await Post.findOneAndUpdate(
        { _id: id, isDeleted: false },
        validatedData,
        { new: true, runValidators: true }
    );

    if (!post) {
        throw new ApiError(status.NOT_FOUND, "Post not found");
    }

    res.json(new ApiResponse(status.OK, "Post updated successfully", post));
});

export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!post) {
        throw new ApiError(status.NOT_FOUND, "Post not found");
    }

    res.json(new ApiResponse(status.OK, "Post deleted successfully"));
});
