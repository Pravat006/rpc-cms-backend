import { Media } from "./media.model";
import { asyncHandler, uploadToCloudinary } from "@/utils";
import { getApiErrorClass, getApiResponseClass } from "@/interface";
import status from "http-status";
import { cloudinary } from "../../config/cloudinary";

const ApiError = getApiErrorClass("MEDIA");
const ApiResponse = getApiResponseClass("MEDIA");

export const uploadMedia = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(status.BAD_REQUEST, "No file uploaded");
    }

    const file = req.file;
    const userId = req.user?._id;

    // Determine folder name based on request URL
    let folderName = 'ram-pharma-uploads';
    if (req.originalUrl.includes('/posts')) folderName = 'ram-pharma-posts';
    else if (req.originalUrl.includes('/faculty')) folderName = 'ram-pharma-faculty';
    else if (req.originalUrl.includes('/team')) folderName = 'ram-pharma-team';
    else if (req.originalUrl.includes('/gallery')) folderName = 'ram-pharma-gallery';
    else if (req.originalUrl.includes('/testimonials')) folderName = 'ram-pharma-testimonials';
    else if (req.originalUrl.includes('/pages')) folderName = 'ram-pharma-pages';
    else if (req.originalUrl.includes('/global-settings')) folderName = 'ram-pharma-identity';

    try {
        const cloudinaryResult = await uploadToCloudinary(file.buffer, folderName);

        let type: "image" | "video" | "document" = "image";
        if (file.mimetype.startsWith("video")) type = "video";
        else if (file.mimetype.includes("pdf") || file.mimetype.includes("doc")) type = "document";

        const media = new Media({
            filename: file.originalname,
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
            type,
            mimeType: file.mimetype,
            size: file.size,
            uploadedBy: userId,
        });

        await media.save();

        res.status(status.CREATED).json(
            new ApiResponse(status.CREATED, "File uploaded successfully", media)
        );
    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error);
        throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message || "Cloudinary upload failed");
    }
});

export const getAllMedia = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, type } = req.query;

    const filter: any = {};
    if (type) filter.type = type;

    const skip = (Number(page) - 1) * Number(limit);

    const mediaList = await Media.find(filter)
        .sort({ uploadedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("uploadedBy", "name");

    const total = await Media.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    const result = {
        media: mediaList,
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
    };

    res.json(new ApiResponse(status.OK, "Media retrieved successfully", result));
});

export const deleteMedia = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const media = await Media.findById(id);

    if (!media) {
        throw new ApiError(status.NOT_FOUND, "Media not found");
    }

    try {
        await cloudinary.uploader.destroy(media.publicId);
    } catch (error) {
        console.error("Cloudinary deletion failed:", error);
    }

    await Media.findByIdAndDelete(id);

    res.json(new ApiResponse(status.OK, "Media deleted successfully"));
});
