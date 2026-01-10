import express from "express";
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
    markAsRead,
    getContactStats,
} from "./contact.controller";
import { auth, authenticatedActionLimiter, authLimiter } from "@/middlewares";

const router = express.Router();

// Public route - for frontend contact form
router.post("/", authLimiter, createContact);

// Admin routes
router.get("/", auth("admin"), getAllContacts);
router.get("/stats", auth("admin"), getContactStats);
router.get("/:id", auth("admin"), getContactById);
router.patch("/:id", auth("admin"), authenticatedActionLimiter, updateContact);
router.patch("/:id/mark-read", auth("admin"), authenticatedActionLimiter, markAsRead);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deleteContact);

export const contactRouter = router;
