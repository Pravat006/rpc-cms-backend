import express from "express";
import {
    createPost,
    getAllPosts,
    getPostBySlug,
    getPostById,
    updatePost,
    deletePost,
} from "./post.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";

const router = express.Router();

// Public routes
router.get("/slug/:slug", getPostBySlug);
router.get("/", getAllPosts);

// Admin routes
router.post("/", auth("admin"), authenticatedActionLimiter, createPost);
router.get("/:id", auth("admin"), authenticatedActionLimiter, getPostById);
router.patch("/:id", auth("admin"), authenticatedActionLimiter, updatePost);
router.delete("/:id", auth("admin"), authenticatedActionLimiter, deletePost);

export const postRouter = router;
