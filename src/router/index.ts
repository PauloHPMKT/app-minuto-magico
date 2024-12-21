import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue")
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('../layout/AppLayout.vue'),
      redirect: { name: 'playground' },
      children: [
        {
          path: 'playground',
          name: 'playground',
          component: () => import('../views/Playground.vue')
        },
      ]
    }
  ]
})
