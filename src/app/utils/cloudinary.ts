import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

/**
 * Uploads a buffer to Cloudinary
 * @param buffer The file buffer
 * @param folder The folder name in Cloudinary
 * @returns Cloudinary upload response
 */
export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "auto",
                transformation: [{ width: 1200, height: 600, crop: 'limit' }],
            },
            (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error("Cloudinary upload failed"));
                resolve(result);
            }
        );
        uploadStream.end(buffer);
    });
};
