"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRouter = void 0;
const express_1 = __importDefault(require("express"));
const testimonial_controller_1 = require("./testimonial.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public route
router.get("/", testimonial_controller_1.getAllTestimonials);
// Admin routes
router.post("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, testimonial_controller_1.createTestimonial);
router.get("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, testimonial_controller_1.getTestimonialById);
router.put("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, testimonial_controller_1.updateTestimonial);
router.patch("/reorder", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, testimonial_controller_1.reorderTestimonials);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, testimonial_controller_1.deleteTestimonial);
exports.testimonialRouter = router;
//# sourceMappingURL=testimonial.routes.js.map