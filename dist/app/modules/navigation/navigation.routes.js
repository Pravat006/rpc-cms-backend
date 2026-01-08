"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const navigation_controller_1 = require("./navigation.controller");
const router = express_1.default.Router();
router.get("/", navigation_controller_1.NavigationController.getNavigation);
router.put("/", navigation_controller_1.NavigationController.updateNavigation);
exports.NavigationRoutes = router;
//# sourceMappingURL=navigation.routes.js.map