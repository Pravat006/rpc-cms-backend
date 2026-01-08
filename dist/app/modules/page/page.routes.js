"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRouter = void 0;
const express_1 = __importDefault(require("express"));
const page_controller_1 = require("./page.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public routes (for frontend)
router.get("/slug/:slug", page_controller_1.getPageBySlug);
router.get("/", page_controller_1.getAllPages);
// Admin routes
router.post("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.createPage);
router.get("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.getPageById);
router.put("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.updatePage);
router.patch("/:id/publish", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.togglePublish);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.deletePage);
// Granular Section Management
router.post("/:id/sections", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.addSection);
router.patch("/:id/sections/:sectionId", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.updateSection);
router.delete("/:id/sections/:sectionId", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, page_controller_1.deleteSection);
exports.pageRouter = router;
//# sourceMappingURL=page.routes.js.map