import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../views/NotFoundPage.vue";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import AssessmentPage from "../views/AssessmentPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import HistoryPage from "../views/HistoryPage.vue";
import ComingSoonPage from "../views/ComingSoonPage.vue";

const routes = [
  {
    path: "/login",
    component: LoginPage,
    meta: { layout: "AuthLayout" },
  },
  {
    path: "/register",
    component: RegisterPage,
    meta: { layout: "AuthLayout" },
  },
  {
    path: "/forgot-password",
    component: ComingSoonPage,
    meta: { layout: "AuthLayout" },
  },
  {
    path: "/",
    component: HomePage,
    meta: { layout: "MainLayout" },
  },
  {
    path: "/profile",
    component: ProfilePage,
    meta: { layout: "MainLayout" },
  },
  {
    path: "/assessment",
    component: AssessmentPage,
    meta: { layout: "MainLayout" },
  },
  {
    path: "/history",
    component: HistoryPage,
    meta: { layout: "MainLayout" },
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { layout: "MainLayout" },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    meta: { layout: "DefaultLayout" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (el) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const top =
          el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        return { top, behavior: "smooth" };
      }
    } else if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
