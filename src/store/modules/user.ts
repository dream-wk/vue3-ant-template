import { defineStore } from 'pinia';
import { store } from '@/store';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'dream_wk',
    age: 18,
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
  },
});

// Need to be used outside the setup
// 需要在设置之外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
