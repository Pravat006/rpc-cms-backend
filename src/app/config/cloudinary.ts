import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from './index';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true
});

// Use Memory Storage for more control and to bypass multer-storage-cloudinary issues
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

export { cloudinary, upload };
