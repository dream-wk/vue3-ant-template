import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useBreadcrumbStore } from './breadcrumb';

export const useKeepAliveStore = defineStore('keepAlive', () => {
  const breadcrumbStore = useBreadcrumbStore();
  const cache = ref<any>([]);

  function deleteCache(componentName: any) {
    const index = cache.value.findIndex((item: any) => item === componentName);
    if (index !== -1) {
      cache.value.splice(index, 1);
    }
  }

  function addCache(componentName: any) {
    const index = cache.value.findIndex((item: any) => item === componentName);
    if (index === -1) {
      cache.value.push(componentName);
    }
  }

  /**
   * 获取组件名称，如果meta中配置了componentName，则使用componentName作为组件名，否则使用路由名称作为组件名
   * @param route 路由
   * @returns
   */
  function getComponentName(route: any) {
    const { name, meta } = route;
    return meta.componentName || name;
  }

  function setCache(to: any, from: any) {
    const toRouteComponentName = getComponentName(to);
    const fromRouteComponentName = getComponentName(from);
    if (from.meta.keepAlive) {
      addCache(fromRouteComponentName);
    }
    if (to.meta.keepAlive) {
      const { breadcrumb } = breadcrumbStore;
      const toIndex = breadcrumb.findIndex((item) => item.name === to.name);
      const fromIndex = breadcrumb.findIndex((item) => item.name === from.name);
      if (toIndex === -1 || fromIndex === -1 || toIndex >= fromIndex) {
        deleteCache(toRouteComponentName);
      } else {
        addCache(toRouteComponentName);
      }
    }
  }
  return {
    cache,
    setCache,
  };
});
