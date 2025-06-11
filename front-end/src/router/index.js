import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../views/NotFoundPage.vue";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import AssessmentPage from "../views/AssessmentPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import HistoryPage from "../views/HistoryPage.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import SkPage from "../views/SkPage.vue";
import ContactSupport from "../views/ContactSupport.vue";
import { useAuthStore } from "../stores/index.js";

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: { layout: "MainLayout" },
  },
  {
    path: "/login",
    component: LoginPage,
    meta: { layout: "AuthLayout", requiresGuest: true },
  },
  {
    path: "/register",
    component: RegisterPage,
    meta: { layout: "AuthLayout", requiresGuest: true },
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    meta: { layout: "DefaultLayout", requiresGuest: true },
  },
  {
    path: "/sk",
    component: SkPage,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/profile",
    component: ProfilePage,
    meta: { layout: "MainLayout", requiresAuth: true },
  },

  {
    path: "/assessment",
    component: AssessmentPage,
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: "/history",
    component: HistoryPage,
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: "/dashboard/:id",
    component: DashboardPage,
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: "/contact-support",
    component: ContactSupport,
    meta: { layout: "DefaultLayout", requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  if (requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (requiresGuest && authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
