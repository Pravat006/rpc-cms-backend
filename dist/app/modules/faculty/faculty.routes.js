"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRouter = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public route
router.get("/", faculty_controller_1.getAllFaculty);
// Admin routes
router.post("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, faculty_controller_1.createFaculty);
router.get("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, faculty_controller_1.getFacultyById);
router.put("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, faculty_controller_1.updateFaculty);
router.patch("/reorder", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, faculty_controller_1.reorderFaculty);
router.delete("/:id", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, faculty_controller_1.deleteFaculty);
exports.facultyRouter = router;
//# sourceMappingURL=faculty.routes.js.map