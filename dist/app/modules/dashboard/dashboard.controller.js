"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardSummary = void 0;
const page_model_1 = require("../page/page.model");
const post_model_1 = require("../post/post.model");
const faculty_model_1 = require("../faculty/faculty.model");
const team_model_1 = require("../team/team.model");
const utils_1 = require("../../utils");
const interface_1 = require("../../interface");
const http_status_1 = __importDefault(require("http-status"));
const ApiResponse = (0, interface_1.getApiResponseClass)("DASHBOARD");
exports.getDashboardSummary = (0, utils_1.asyncHandler)(async (req, res) => {
    // Pipeline to get counts from multiple collections using UnionWith
    const counts = await page_model_1.Page.aggregate([
        { $match: { isDeleted: false } },
        { $count: "count" },
        { $project: { _id: 0, label: { $literal: "pages" }, count: 1 } },
        {
            $unionWith: {
                coll: post_model_1.Post.collection.name,
                pipeline: [{ $match: { isDeleted: false } }, { $count: "count" }, { $project: { _id: 0, label: { $literal: "posts" }, count: 1 } }]
            }
        },
        {
            $unionWith: {
                coll: faculty_model_1.Faculty.collection.name,
                pipeline: [{ $match: { isDeleted: false } }, { $count: "count" }, { $project: { _id: 0, label: { $literal: "faculty" }, count: 1 } }]
            }
        },
        {
            $unionWith: {
                coll: team_model_1.TeamMember.collection.name,
                pipeline: [{ $match: { isDeleted: false } }, { $count: "count" }, { $project: { _id: 0, label: { $literal: "team" }, count: 1 } }]
            }
        }
    ]);
    // Format the counts into a nice object
    const stats = {
        pages: 0,
        posts: 0,
        faculty: 0,
        team: 0
    };
    counts.forEach(item => {
        if (item.label)
            stats[item.label] = item.count;
    });
    // Get recent data
    const recentPosts = await post_model_1.Post.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(5).select("title slug createdAt");
    res.json(new ApiResponse(http_status_1.default.OK, "Dashboard summary retrieved", {
        stats,
        recentPosts
    }));
});
//# sourceMappingURL=dashboard.controller.js.map