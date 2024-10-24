import { defineStore } from 'pinia';
import type { RouteRecordName } from 'vue-router';

interface Breadcrumb {
  name: RouteRecordName;
  path: string;
  meta: any;
}

export const useBreadcrumbStore = defineStore('breadcrumb', {
  state: () => ({
    breadcrumb: [] as Breadcrumb[],
  }),

  actions: {
    // 设置面包屑
    setBreadcrumb(data: Breadcrumb[]) {
      this.breadcrumb = data;
      sessionStorage.setItem('breadcrumb', JSON.stringify(data));
    },

    // 添加面包屑
    addBreadcrumb(data: Breadcrumb) {
      const index = this.breadcrumb.findIndex((item) => item.name === data.name);
      if (index === -1) {
        this.breadcrumb.push(data);
      } else {
        const newBreadcrumb = this.breadcrumb.slice(0, index);
        newBreadcrumb.push(data);
        this.breadcrumb = newBreadcrumb;
      }
      sessionStorage.setItem('breadcrumb', JSON.stringify(this.breadcrumb));
    },

    // 替换面包屑
    replaceBreadcrumb(data: Breadcrumb) {
      this.breadcrumb.splice(this.breadcrumb.length - 1, 1, data);
      sessionStorage.setItem('breadcrumb', JSON.stringify(this.breadcrumb));
    },

    setBreadcrumbByMatched(route: any) {
      this.clearBreadcrumb(); // 你需要实现这个方法
      const { meta, name, fullPath, matched } = route;
      const result: any[] = [];
      const len = matched.length;

      matched.forEach((item: any, index: number) => {
        if (index >= len - 1) return;

        const { name, path, meta, redirect } = item;
        if (path !== '/' && path !== '/base' && (!redirect || redirect !== matched[index + 1].path)) {
          result.push({
            name,
            path: redirect || path,
            meta,
          });
        }
      });

      result.push({ name, path: fullPath, meta });
      this.setBreadcrumb(result);
    },

    getBreadcrumbFromStorage() {
      try {
        const result = JSON.parse(sessionStorage.getItem('breadcrumb') as string);
        if (Array.isArray(result)) {
          return result;
        } else {
          return [];
        }
      } catch {
        return [];
      }
    },

    generateBreadcrumb(toRoute: any, fromRoute: any) {
      const { meta, name, fullPath } = toRoute;
      const storageBreadCrumb = this.getBreadcrumbFromStorage();

      if (meta.clearBreadcrumb || !storageBreadCrumb.length) {
        this.setBreadcrumbByMatched(toRoute);
      } else if (!fromRoute) {
        const lastBreadCrumb = storageBreadCrumb[storageBreadCrumb.length - 1];
        if (lastBreadCrumb.path === fullPath) {
          this.setBreadcrumb(storageBreadCrumb);
        } else {
          this.setBreadcrumbByMatched(toRoute);
        }
      } else {
        this.addBreadcrumb({ name, path: fullPath, meta });
      }
    },

    clearBreadcrumb() {
      this.breadcrumb = [];
      sessionStorage.removeItem('breadcrumb');
    },
  },
});
