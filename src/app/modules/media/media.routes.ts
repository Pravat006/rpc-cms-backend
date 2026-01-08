import express from "express";
import { uploadMedia, getAllMedia, deleteMedia } from "./media.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";
import { upload } from "../../config/cloudinary";

const router = express.Router();

// Admin routes only
router.post("/upload", auth("admin"), authenticatedActionLimiter, upload.single("file"), uploadMedia);
router.get("/", auth("admin"), authenticatedActionLimiter, getAllMedia);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deleteMedia);

export const mediaRouter = router;
