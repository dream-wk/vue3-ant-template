import { defineStore } from 'pinia';
import { constantRoutes, asyncRoutes } from '@/router/menus';
import { cloneDeep } from 'lodash-es';

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission: any, route: any) {
  if (route.meta && route.meta.permission) {
    console.log('hasPermission', permission);
    if (permission === undefined) {
      return false;
    }
    let flag = false;
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
}

function filterAsyncRouter(routerMap: any, role: any) {
  const accessedRouters = routerMap.filter((route: any) => {
    if (hasPermission(role.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routers: constantRoutes,
    addRouters: [],
  }),
  actions: {
    generateRoutes(data: any) {
      const { role } = data;
      const routerMap = cloneDeep(asyncRoutes);
      const accessedRouters = filterAsyncRouter(routerMap, role);
      this.routers = constantRoutes.concat(accessedRouters);
    },
  },
});
