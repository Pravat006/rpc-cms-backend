"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRouter = void 0;
const express_1 = __importDefault(require("express"));
const lead_controller_1 = require("./lead.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public route (rate limited)
router.post("/", middlewares_1.publicActionLimiter, lead_controller_1.createLead);
// Admin routes
router.get("/", (0, middlewares_1.auth)("admin"), lead_controller_1.getAllLeads);
router.patch("/:id/status", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, lead_controller_1.updateLeadStatus);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, lead_controller_1.deleteLead);
exports.leadRouter = router;
//# sourceMappingURL=lead.routes.js.map