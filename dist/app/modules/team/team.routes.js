"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express_1 = __importDefault(require("express"));
const team_controller_1 = require("./team.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public route
router.get("/", team_controller_1.getAllTeamMembers);
// Admin routes
router.post("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, team_controller_1.createTeamMember);
router.get("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, team_controller_1.getTeamMemberById);
router.put("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, team_controller_1.updateTeamMember);
router.patch("/reorder", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, team_controller_1.reorderTeamMembers);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, team_controller_1.deleteTeamMember);
exports.teamRouter = router;
//# sourceMappingURL=team.routes.js.map