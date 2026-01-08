"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedia = exports.getAllMedia = exports.uploadMedia = void 0;
const media_model_1 = require("./media.model");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const cloudinary_1 = require("../../config/cloudinary");
const ApiError = (0, interface_1.getApiErrorClass)("MEDIA");
const ApiResponse = (0, interface_1.getApiResponseClass)("MEDIA");
exports.uploadMedia = (0, utils_1.asyncHandler)(async (req, res) => {
    if (!req.file) {
        throw new ApiError(http_status_1.default.BAD_REQUEST, "No file uploaded");
    }
    const file = req.file;
    const userId = req.user?._id;
    // Determine folder name based on request URL
    let folderName = 'ram-pharma-uploads';
    if (req.originalUrl.includes('/posts'))
        folderName = 'ram-pharma-posts';
    else if (req.originalUrl.includes('/faculty'))
        folderName = 'ram-pharma-faculty';
    else if (req.originalUrl.includes('/team'))
        folderName = 'ram-pharma-team';
    else if (req.originalUrl.includes('/gallery'))
        folderName = 'ram-pharma-gallery';
    else if (req.originalUrl.includes('/testimonials'))
        folderName = 'ram-pharma-testimonials';
    else if (req.originalUrl.includes('/pages'))
        folderName = 'ram-pharma-pages';
    else if (req.originalUrl.includes('/global-settings'))
        folderName = 'ram-pharma-identity';
    try {
        const cloudinaryResult = await (0, utils_1.uploadToCloudinary)(file.buffer, folderName);
        let type = "image";
        if (file.mimetype.startsWith("video"))
            type = "video";
        else if (file.mimetype.includes("pdf") || file.mimetype.includes("doc"))
            type = "document";
        const media = new media_model_1.Media({
            filename: file.originalname,
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
            type,
            mimeType: file.mimetype,
            size: file.size,
            uploadedBy: userId,
        });
        await media.save();
        res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "File uploaded successfully", media));
    }
    catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, error.message || "Cloudinary upload failed");
    }
});
exports.getAllMedia = (0, utils_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 20, type } = req.query;
    const filter = {};
    if (type)
        filter.type = type;
    const skip = (Number(page) - 1) * Number(limit);
    const mediaList = await media_model_1.Media.find(filter)
        .sort({ uploadedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("uploadedBy", "name");
    const total = await media_model_1.Media.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));
    const result = {
        media: mediaList,
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
    };
    res.json(new ApiResponse(http_status_1.default.OK, "Media retrieved successfully", result));
});
exports.deleteMedia = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const media = await media_model_1.Media.findById(id);
    if (!media) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Media not found");
    }
    try {
        await cloudinary_1.cloudinary.uploader.destroy(media.publicId);
    }
    catch (error) {
        console.error("Cloudinary deletion failed:", error);
    }
    await media_model_1.Media.findByIdAndDelete(id);
    res.json(new ApiResponse(http_status_1.default.OK, "Media deleted successfully"));
});
//# sourceMappingURL=media.controller.js.map