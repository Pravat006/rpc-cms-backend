import { GalleryImage } from "./gallery.model";
import { createGalleryImageValidation, updateGalleryImageValidation } from "./gallery.validation";
import { asyncHandler } from "@/utils";
import { getApiErrorClass, getApiResponseClass } from "@/interface";
import status from "http-status";

const ApiError = getApiErrorClass("GALLERY");
const ApiResponse = getApiResponseClass("GALLERY");

export const addGalleryImage = asyncHandler(async (req, res) => {
    const validatedData = createGalleryImageValidation.parse(req.body);

    const galleryImage = new GalleryImage(validatedData);
    await galleryImage.save();

    res.status(status.CREATED).json(
        new ApiResponse(status.CREATED, "Image added to gallery successfully", galleryImage)
    );
});

export const getAllGalleryImages = asyncHandler(async (req, res) => {
    const { album, search } = req.query;

    const filter: any = {};
    if (album) filter.album = album;
    if (search) {
        filter.$or = [
            { alt: { $regex: search, $options: "i" } },
            { caption: { $regex: search, $options: "i" } },
        ];
    }

    const images = await GalleryImage.find(filter)
        .sort({ album: 1, order: 1 });

    res.json(new ApiResponse(status.OK, "Gallery images retrieved successfully", images));
});

export const updateGalleryImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = updateGalleryImageValidation.parse(req.body);

    const image = await GalleryImage.findByIdAndUpdate(
        id,
        validatedData,
        { new: true, runValidators: true }
    );

    if (!image) {
        throw new ApiError(status.NOT_FOUND, "Gallery image not found");
    }

    res.json(new ApiResponse(status.OK, "Gallery image updated successfully", image));
});

export const deleteGalleryImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const image = await GalleryImage.findByIdAndDelete(id);

    if (!image) {
        throw new ApiError(status.NOT_FOUND, "Gallery image not found");
    }

    res.json(new ApiResponse(status.OK, "Gallery image deleted successfully"));
});

export const reorderGallery = asyncHandler(async (req, res) => {
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

    await GalleryImage.bulkWrite(bulkOps);

    res.json(new ApiResponse(status.OK, "Gallery reordered successfully"));
});
