"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const page_routes_1 = require("../modules/page/page.routes");
const global_settings_routes_1 = require("../modules/global-settings/global-settings.routes");
const media_routes_1 = require("../modules/media/media.routes");
const post_routes_1 = require("../modules/post/post.routes");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const team_routes_1 = require("../modules/team/team.routes");
const gallery_routes_1 = require("../modules/gallery/gallery.routes");
const testimonial_routes_1 = require("../modules/testimonial/testimonial.routes");
const navigation_routes_1 = require("../modules/navigation/navigation.routes");
const dashboard_routes_1 = require("../modules/dashboard/dashboard.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/dashboard',
        route: dashboard_routes_1.dashboardRouter
    },
    {
        path: '/auth',
        route: auth_routes_1.authRouter
    },
    {
        path: '/pages',
        route: page_routes_1.pageRouter
    },
    {
        path: '/settings',
        route: global_settings_routes_1.globalSettingsRouter
    },
    {
        path: '/media',
        route: media_routes_1.mediaRouter
    },
    {
        path: '/posts',
        route: post_routes_1.postRouter
    },
    {
        path: '/faculty',
        route: faculty_routes_1.facultyRouter
    },
    {
        path: '/team',
        route: team_routes_1.teamRouter
    },
    {
        path: '/gallery',
        route: gallery_routes_1.galleryRouter
    },
    {
        path: '/testimonials',
        route: testimonial_routes_1.testimonialRouter
    },
    {
        path: '/navigation',
        route: navigation_routes_1.NavigationRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map