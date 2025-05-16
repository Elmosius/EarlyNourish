import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";

const routes = createRouter({
  routes: [
    {
      path: "/",
      component: Home,
      meta: { layout: "MainLayout" },
    },
    {
      path: "/:notFound*",
      component: NotFound,
      meta: { layout: "DefaultLayout" },
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default routes;
