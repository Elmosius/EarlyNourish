import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../views/NotFoundPage.vue";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import AssessmentPage from "../views/AssessmentPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import RiwayatPage from "../views/RiwayatPage.vue";

const routes = createRouter({
  routes: [
    {
      path: "/login",
      component: LoginPage,
      meta: { layout: "DefaultLayout" },
    },
    {
      path: "/register",
      component: RegisterPage,
      meta: { layout: "DefaultLayout" },
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
      path: "/riwayat",
      component: RiwayatPage,
      meta: { layout: "MainLayout" },
    },
    // ini nanti jadi /dashboard/{id}
    {
      path: "/dashboard",
      component: DashboardPage,
      meta: { layout: "MainLayout" },
    },
    {
      path: "/:notFound*",
      component: NotFoundPage,
      meta: { layout: "DefaultLayout" },
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default routes;
