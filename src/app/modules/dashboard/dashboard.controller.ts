import { Page } from "../page/page.model";
import { Post } from "../post/post.model";
import { Faculty } from "../faculty/faculty.model";
import { TeamMember } from "../team/team.model";
import { asyncHandler } from "@/utils";
import { getApiResponseClass } from "@/interface";
import status from "http-status";

const ApiResponse = getApiResponseClass("DASHBOARD");

export const getDashboardSummary = asyncHandler(async (req, res) => {
    // Pipeline to get counts from multiple collections using UnionWith
    const counts = await Page.aggregate([
        { $match: { isDeleted: false } },
        { $count: "count" },
        { $project: { _id: 0, label: { $literal: "pages" }, count: 1 } },
        {
            $unionWith: {
                coll: Post.collection.name,
                pipeline: [{ $match: { isDeleted: false } }, { $count: "count" }, { $project: { _id: 0, label: { $literal: "posts" }, count: 1 } }]
            }
        },
        {
            $unionWith: {
                coll: Faculty.collection.name,
                pipeline: [{ $match: { isDeleted: false } }, { $count: "count" }, { $project: { _id: 0, label: { $literal: "faculty" }, count: 1 } }]
            }
        },
        {
            $unionWith: {
                coll: TeamMember.collection.name,
                pipeline: [{ $match: { isDeleted: false } }, { $count: "count" }, { $project: { _id: 0, label: { $literal: "team" }, count: 1 } }]
            }
        }
    ]);

    // Format the counts into a nice object
    const stats: any = {
        pages: 0,
        posts: 0,
        faculty: 0,
        team: 0
    };

    counts.forEach(item => {
        if (item.label) stats[item.label] = item.count;
    });

    // Get recent data
    const recentPosts = await Post.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(5).select("title slug createdAt");

    res.json(new ApiResponse(status.OK, "Dashboard summary retrieved", {
        stats,
        recentPosts
    }));
});
