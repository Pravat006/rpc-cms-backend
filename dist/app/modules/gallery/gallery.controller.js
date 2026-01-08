"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderGallery = exports.deleteGalleryImage = exports.updateGalleryImage = exports.getAllGalleryImages = exports.addGalleryImage = void 0;
const gallery_model_1 = require("./gallery.model");
const gallery_validation_1 = require("./gallery.validation");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiError = (0, interface_1.getApiErrorClass)("GALLERY");
const ApiResponse = (0, interface_1.getApiResponseClass)("GALLERY");
exports.addGalleryImage = (0, utils_1.asyncHandler)(async (req, res) => {
    const validatedData = gallery_validation_1.createGalleryImageValidation.parse(req.body);
    const galleryImage = new gallery_model_1.GalleryImage(validatedData);
    await galleryImage.save();
    res.status(http_status_1.default.CREATED).json(new ApiResponse(http_status_1.default.CREATED, "Image added to gallery successfully", galleryImage));
});
exports.getAllGalleryImages = (0, utils_1.asyncHandler)(async (req, res) => {
    const { album, search } = req.query;
    const filter = {};
    if (album)
        filter.album = album;
    if (search) {
        filter.$or = [
            { alt: { $regex: search, $options: "i" } },
            { caption: { $regex: search, $options: "i" } },
        ];
    }
    const images = await gallery_model_1.GalleryImage.find(filter)
        .sort({ album: 1, order: 1 });
    res.json(new ApiResponse(http_status_1.default.OK, "Gallery images retrieved successfully", images));
});
exports.updateGalleryImage = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const validatedData = gallery_validation_1.updateGalleryImageValidation.parse(req.body);
    const image = await gallery_model_1.GalleryImage.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
    if (!image) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Gallery image not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Gallery image updated successfully", image));
});
exports.deleteGalleryImage = (0, utils_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const image = await gallery_model_1.GalleryImage.findByIdAndDelete(id);
    if (!image) {
        throw new ApiError(http_status_1.default.NOT_FOUND, "Gallery image not found");
    }
    res.json(new ApiResponse(http_status_1.default.OK, "Gallery image deleted successfully"));
});
exports.reorderGallery = (0, utils_1.asyncHandler)(async (req, res) => {
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
    await gallery_model_1.GalleryImage.bulkWrite(bulkOps);
    res.json(new ApiResponse(http_status_1.default.OK, "Gallery reordered successfully"));
});
//# sourceMappingURL=gallery.controller.js.map