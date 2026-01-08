"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public routes
router.get("/slug/:slug", post_controller_1.getPostBySlug);
router.get("/", post_controller_1.getAllPosts);
// Admin routes
router.post("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, post_controller_1.createPost);
router.get("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, post_controller_1.getPostById);
router.put("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, post_controller_1.updatePost);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, post_controller_1.deletePost);
exports.postRouter = router;
//# sourceMappingURL=post.routes.js.map