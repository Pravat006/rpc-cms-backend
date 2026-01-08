import express from "express";
import { NavigationController } from "./navigation.controller";

const router = express.Router();

router.get("/", NavigationController.getNavigation);
router.patch("/", NavigationController.updateNavigation);

export const NavigationRoutes = router;
