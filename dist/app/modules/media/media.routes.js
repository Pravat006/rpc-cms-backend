"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRouter = void 0;
const express_1 = __importDefault(require("express"));
const media_controller_1 = require("./media.controller");
const middlewares_1 = require("../../middlewares");
const cloudinary_1 = require("../../config/cloudinary");
const router = express_1.default.Router();
// Admin routes only
router.post("/upload", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, cloudinary_1.upload.single("file"), media_controller_1.uploadMedia);
router.get("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, media_controller_1.getAllMedia);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, media_controller_1.deleteMedia);
exports.mediaRouter = router;
//# sourceMappingURL=media.routes.js.map