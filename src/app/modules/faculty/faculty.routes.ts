import express from "express";
import {
    createFaculty,
    getAllFaculty,
    getFacultyById,
    updateFaculty,
    deleteFaculty,
    reorderFaculty,
} from "./faculty.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";

const router = express.Router();

// Public route
router.get("/", getAllFaculty);

// Admin routes
router.post("/", auth("admin"), authenticatedActionLimiter, createFaculty);
router.get("/:id", auth("admin"), authenticatedActionLimiter, getFacultyById);
router.patch("/:id", auth("admin"), authenticatedActionLimiter, updateFaculty);
router.patch("/reorder", auth("admin"), authenticatedActionLimiter, reorderFaculty);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deleteFaculty);

export const facultyRouter = router;
