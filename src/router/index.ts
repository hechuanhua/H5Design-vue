import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/preview",
      name: "preview",
      component: () => import("../views/Preview.vue"),
    },
    {
      path: "/echarts",
      name: "echarts",
      component: () => import("../views/Echarts.vue"),
    },
  ],
});

export default router;
