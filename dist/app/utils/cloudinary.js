"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
/**
 * Uploads a buffer to Cloudinary
 * @param buffer The file buffer
 * @param folder The folder name in Cloudinary
 * @returns Cloudinary upload response
 */
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: folder,
            resource_type: "auto",
            transformation: [{ width: 1200, height: 600, crop: 'limit' }],
        }, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error("Cloudinary upload failed"));
            resolve(result);
        });
        uploadStream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=cloudinary.js.map