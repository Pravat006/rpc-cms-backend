"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalSettingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const global_settings_controller_1 = require("./global-settings.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
// Public route (for frontend)
router.get("/", global_settings_controller_1.getGlobalSettings);
// Admin routes
router.post("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, global_settings_controller_1.updateGlobalSettings);
router.put("/", (0, middlewares_1.auth)("admin"), middlewares_1.authenticatedActionLimiter, global_settings_controller_1.updateGlobalSettings);
exports.globalSettingsRouter = router;
//# sourceMappingURL=global-settings.routes.js.map