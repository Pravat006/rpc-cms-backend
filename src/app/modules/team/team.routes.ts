import express from "express";
import {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember,
    reorderTeamMembers,
} from "./team.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";

const router = express.Router();

// Public route
router.get("/", getAllTeamMembers);

// Admin routes
router.post("/", auth("admin"), authenticatedActionLimiter, createTeamMember);
router.get("/:id", auth("admin"), authenticatedActionLimiter, getTeamMemberById);
router.patch("/:id", auth("admin"), authenticatedActionLimiter, updateTeamMember);
router.patch("/reorder", auth("admin"), authenticatedActionLimiter, reorderTeamMembers);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deleteTeamMember);

export const teamRouter = router;
