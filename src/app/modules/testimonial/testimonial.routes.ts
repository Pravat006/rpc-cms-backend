import express from "express";
import {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial,
    reorderTestimonials,
} from "./testimonial.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";

const router = express.Router();

// Public route
router.get("/", getAllTestimonials);

// Admin routes
router.post("/", auth("admin"), authenticatedActionLimiter, createTestimonial);
router.get("/:id", auth("admin"), authenticatedActionLimiter, getTestimonialById);
router.patch("/:id", auth("admin"), authenticatedActionLimiter, updateTestimonial);
router.patch("/reorder", auth("admin"), authenticatedActionLimiter, reorderTestimonials);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deleteTestimonial);

export const testimonialRouter = router;
