"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRouter = void 0;
const express_1 = __importDefault(require("express"));
const gallery_controller_1 = require("./gallery.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public route
router.get("/", gallery_controller_1.getAllGalleryImages);
// Admin routes
router.post("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, gallery_controller_1.addGalleryImage);
router.put("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, gallery_controller_1.updateGalleryImage);
router.patch("/reorder", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, gallery_controller_1.reorderGallery);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, gallery_controller_1.deleteGalleryImage);
exports.galleryRouter = router;
//# sourceMappingURL=gallery.routes.js.map