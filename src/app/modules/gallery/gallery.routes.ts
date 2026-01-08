import express from "express";
import {
    addGalleryImage,
    getAllGalleryImages,
    updateGalleryImage,
    deleteGalleryImage,
    reorderGallery,
} from "./gallery.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";

const router = express.Router();

// Public route
router.get("/", getAllGalleryImages);

// Admin routes
router.post("/", auth("admin"), authenticatedActionLimiter, addGalleryImage);
router.patch("/:id", auth("admin"), authenticatedActionLimiter, updateGalleryImage);
router.patch("/reorder", auth("admin"), authenticatedActionLimiter, reorderGallery);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deleteGalleryImage);

export const galleryRouter = router;
