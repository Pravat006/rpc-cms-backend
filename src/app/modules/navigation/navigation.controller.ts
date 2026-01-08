import { Request, Response } from "express";
import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { getApiResponseClass } from "../../interface/index"; // or "@/interface"
import { Navigation } from "./navigation.model";
import { Page } from "../page/page.model";

const ApiResponse = getApiResponseClass("NAVIGATION");

// Helper to seed/init if not exists
const ensureNavigationExists = async () => {
    let nav = await Navigation.findOne({});
    if (!nav) {
        nav = await Navigation.create({ menu: [] });
    }
    return nav;
};

const getNavigation = asyncHandler(async (req: Request, res: Response) => {
    await ensureNavigationExists();

    // 1. Fetch available pages for Admin to choose from
    const availablePages = await Page.find({}, { title: 1, slug: 1, _id: 1, isPublished: 1 }).sort({ title: 1 });

    // 2. Fetch Navigation with Hydration Pipeline
    const navigation = await Navigation.findOne({})
        .populate({
            path: 'menu.page',
            select: 'title slug isPublished'
        })
        .populate({
            path: 'menu.children.page',
            select: 'title slug isPublished'
        });

    const menuWithDetails = navigation ? navigation.menu : [];

    res.status(httpStatus.OK).json(
        new ApiResponse(httpStatus.OK, "Navigation retrived successfully", {
            menu: menuWithDetails,
            availablePages: availablePages
        })
    );
});

const updateNavigation = asyncHandler(async (req: Request, res: Response) => {
    const { menu } = req.body;

    const nav = await Navigation.findOneAndUpdate(
        {},
        { menu },
        { new: true, upsert: true }
    );

    res.status(httpStatus.OK).json(
        new ApiResponse(httpStatus.OK, "Navigation updated successfully", nav)
    );
});

export const NavigationController = {
    getNavigation,
    updateNavigation
};
