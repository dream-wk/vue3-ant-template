import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/static-router';

export const whiteNameList = ['Login'];
const loginRoutePath = '/login';
const defaultRoutePath = '/personalInfo'; // 一登陆 然后进入系统默认去的地方， todo 后续自己去找第一个有权限的页面

export function createRouterGuards(router: any) {
  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    const userStore = useUserStore();
    if (userStore.token) {
      // todo 后续自己去找第一个有权限的页面
      if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath });
      } else {
        console.log(userStore.userInfo);

        if (!userStore.userInfo.role || userStore.userInfo?.role?.permissionList?.length === 0) {
          // 调接口拿数据
          await userStore.getUserInfoAndRouter();
          const permissionStore = usePermissionStore();
          permissionStore.addRouters.forEach((r) => {
            router.addRoute(r);
          });
          next({ ...to });
        } else {
          next();
        }
      }
    } else {
      if (whiteNameList.includes(to.name as any)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ path: loginRoutePath });
      }
    }
  });
}
