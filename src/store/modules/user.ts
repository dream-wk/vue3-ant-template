import { defineStore } from 'pinia';
import { store } from '@/store';
import { usePermissionStore } from './static-router';

export const useUserStore = defineStore('user', {
  state: (): any => ({
    name: 'dream_wk',
    age: 18,
    token: undefined,
    userInfo: {},
  }),
  getters: {
    getPerson: (state) => {
      return `${state.name}今年${state.age}岁了`;
    },
  },
  actions: {
    changeAge(age: any) {
      this.age = age;
    },
    // 异步更新 name 值
    async updateName(newName: any) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 这里的 this 是当前的 Store 实例
          this.name = newName;
          resolve('异步修改完成');
        }, 2000);
      });
    },
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
    },
    async getUserInfoAndRouter() {
      // todo 去获取用户信息
      // await getUserInfo
      const respondInfo = {
        name: 'wk',
        avatar: '',
        role: {
          permissionList: ['test1'],
          permissions: [],
        },
      };
      this.userInfo = respondInfo;
      this.name = respondInfo.name;
      const permissionStore = usePermissionStore();
      permissionStore.generateRoutes(respondInfo);
    },
  },
  persist: {
    paths: ['token'],
  },
});

// Need to be used outside the setup
// 需要在设置之外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
