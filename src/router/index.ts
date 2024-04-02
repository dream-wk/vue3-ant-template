import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { constantRoutes, asyncRoutes } from './menus';

const routes: Array<RouteRecordRaw> = [...constantRoutes, ...asyncRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
