import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { constantRoutes } from './menus';
import { createRouterGuards, whiteNameList } from './permission';

const routes: Array<RouteRecordRaw> = [...constantRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

createRouterGuards(router);
export default router;
