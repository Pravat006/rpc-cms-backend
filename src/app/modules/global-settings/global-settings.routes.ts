import express from "express";
import { getGlobalSettings, updateGlobalSettings } from "./global-settings.controller";
import { auth, authenticatedActionLimiter } from "@/middlewares";

const router = express.Router();

// Public route (for frontend)
router.get("/", getGlobalSettings);

// Admin routes
router.post("/", auth("admin"), authenticatedActionLimiter, updateGlobalSettings);
router.patch("/", auth("admin"), authenticatedActionLimiter, updateGlobalSettings);

export const globalSettingsRouter = router;
