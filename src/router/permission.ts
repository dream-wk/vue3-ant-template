import router from './index';
import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/static-router';

const allowList = ['login', 'register', 'registerResult']; // no redirect allowList
const loginRoutePath = '/login';
const defaultRoutePath = '/dashboard/workplace';

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
  const userStore = useUserStore();

  if (userStore.token) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
    } else {
      if (!userStore.userInfo.permissionList || userStore.userInfo.permissionList.length === 0) {
        userStore.getUserInfoAndRouter();
        const permissionStore = usePermissionStore();
        permissionStore.addRouters.forEach((r) => {
          router.addRoute(r);
        });
      } else {
        next();
      }
    }
  } else {
    if (allowList.includes(to.name as any)) {
      // 在免登录名单，直接进入
      next();
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } });
    }
  }
});
