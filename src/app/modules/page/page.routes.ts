import express from "express";
import {
    createPage,
    getAllPages,
    getPageBySlug,
    getPageById,
    updatePage,
    togglePublish,
    deletePage,
    addSection,
    updateSection,
    deleteSection,
} from "./page.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";

const router = express.Router();

// Public routes (for frontend)
router.get("/slug/:slug", getPageBySlug);
router.get("/", getAllPages);

// Admin routes
router.post("/", auth("admin"), authenticatedActionLimiter, createPage);
router.get("/:id", auth("admin"), authenticatedActionLimiter, getPageById);
router.patch("/:id", auth("admin"), authenticatedActionLimiter, updatePage);
router.patch("/:id/publish", auth("admin"), authenticatedActionLimiter, togglePublish);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deletePage);

// Granular Section Management
router.post("/:id/sections", auth("admin"), authenticatedActionLimiter, addSection);
router.patch("/:id/sections/:sectionId", auth("admin"), authenticatedActionLimiter, updateSection);
router.delete("/:id/sections/:sectionId", auth("admin"), authenticatedActionLimiter, deleteSection);

export const pageRouter = router;
