import { Router } from "express";
import { getDashboardSummary } from "./dashboard.controller";
import { auth } from "@/middlewares";

const router = Router();

router.get("/summary", auth("admin"), getDashboardSummary);

export const dashboardRouter = router;
