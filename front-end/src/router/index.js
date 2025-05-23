import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../views/NotFoundPage.vue";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import AsesmenPage from "../views/AsesmenPage.vue";

const routes = createRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
      meta: { layout: "MainLayout" },
    },
    {
      path: "/asesmen",
      component: AsesmenPage,
      meta: { layout: "MainLayout" },
    },
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
      path: "/:notFound*",
      component: NotFoundPage,
      meta: { layout: "DefaultLayout" },
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default routes;
