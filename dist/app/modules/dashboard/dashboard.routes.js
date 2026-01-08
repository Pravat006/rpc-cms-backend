"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get("/summary", (0, middlewares_1.auth)("admin"), dashboard_controller_1.getDashboardSummary);
exports.dashboardRouter = router;
//# sourceMappingURL=dashboard.routes.js.map