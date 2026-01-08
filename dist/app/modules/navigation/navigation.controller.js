"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const index_1 = require("../../interface/index"); // or "@/interface"
const navigation_model_1 = require("./navigation.model");
const page_model_1 = require("../page/page.model");
const ApiResponse = (0, index_1.getApiResponseClass)("NAVIGATION");
// Helper to seed/init if not exists
const ensureNavigationExists = async () => {
    let nav = await navigation_model_1.Navigation.findOne({});
    if (!nav) {
        nav = await navigation_model_1.Navigation.create({ menu: [] });
    }
    return nav;
};
const getNavigation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await ensureNavigationExists();
    // 1. Fetch available pages for Admin to choose from
    const availablePages = await page_model_1.Page.find({}, { title: 1, slug: 1, _id: 1, isPublished: 1 }).sort({ title: 1 });
    // 2. Fetch Navigation with Hydration Pipeline
    const navigation = await navigation_model_1.Navigation.findOne({})
        .populate({
        path: 'menu.page',
        select: 'title slug isPublished'
    })
        .populate({
        path: 'menu.children.page',
        select: 'title slug isPublished'
    });
    const menuWithDetails = navigation ? navigation.menu : [];
    res.status(http_status_1.default.OK).json(new ApiResponse(http_status_1.default.OK, "Navigation retrived successfully", {
        menu: menuWithDetails,
        availablePages: availablePages
    }));
});
const updateNavigation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { menu } = req.body;
    const nav = await navigation_model_1.Navigation.findOneAndUpdate({}, { menu }, { new: true, upsert: true });
    res.status(http_status_1.default.OK).json(new ApiResponse(http_status_1.default.OK, "Navigation updated successfully", nav));
});
exports.NavigationController = {
    getNavigation,
    updateNavigation
};
//# sourceMappingURL=navigation.controller.js.map