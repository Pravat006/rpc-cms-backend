import { Router } from "express";
import { authRouter } from "@/modules/auth/auth.routes";

import { pageRouter } from "@/modules/page/page.routes";
import { globalSettingsRouter } from "@/modules/global-settings/global-settings.routes";
import { mediaRouter } from "@/modules/media/media.routes";
import { postRouter } from "@/modules/post/post.routes";
import { facultyRouter } from "@/modules/faculty/faculty.routes";
import { teamRouter } from "@/modules/team/team.routes";
import { galleryRouter } from "@/modules/gallery/gallery.routes";
import { testimonialRouter } from "@/modules/testimonial/testimonial.routes";
import { NavigationRoutes } from "@/modules/navigation/navigation.routes";
import { dashboardRouter } from "@/modules/dashboard/dashboard.routes";

const router = Router();

type Route = {
  path: string;
  route: Router;
}

const moduleRoutes: Route[] = [
  {
    path: '/dashboard',
    route: dashboardRouter
  },
  {
    path: '/auth',
    route: authRouter
  },

  {
    path: '/pages',
    route: pageRouter
  },
  {
    path: '/settings',
    route: globalSettingsRouter
  },
  {
    path: '/media',
    route: mediaRouter
  },
  {
    path: '/posts',
    route: postRouter
  },
  {
    path: '/faculty',
    route: facultyRouter
  },
  {
    path: '/team',
    route: teamRouter
  },
  {
    path: '/gallery',
    route: galleryRouter
  },
  {
    path: '/testimonials',
    route: testimonialRouter
  },
  {
    path: '/navigation',
    route: NavigationRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;