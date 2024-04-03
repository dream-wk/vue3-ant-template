import { defineComponent, reactive, ref, onMounted, watch } from 'vue';
import { asyncRoutes } from '@/router/menus';
import { useRouter, useRoute } from 'vue-router';
import styles from './index.module.less';
import { usePermissionStore } from '@/store/modules/static-router';

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
  setup() {
    function getMenus(): any[] {
      const permissionStore = usePermissionStore();
      const menus: any = permissionStore.routers.find((item) => item.path === '/');
      return menus.children;
    }
    const menus = reactive(getMenus());
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);
    const router = useRouter();
    const route = useRoute();
    // const { state, dispatch } = useStore();

    function handleMenuClick(menu: any) {
      const { key } = menu;
      console.log(key);
      if (!selectedKeys.value.includes(key)) {
        // dispatch('clearBreadcrumb');
        router.push({ path: key });
      }
    }
    function getSelectedKeys(route: any): string[] {
      return [route.path];
    }
    /**
     * 根据选择路径查找展开的菜单项
     * @param currentRoute
     * @returns
     */
    function getOpenKeys(currentRoute: any): string[] {
      return currentRoute.matched.slice(1).map((n: any) => n.path) as string[];
    }

    watch(
      () => route.path,
      () => {
        selectedKeys.value = getSelectedKeys(route);
      },
      {
        immediate: true,
      },
    );

    onMounted(() => {
      openKeys.value = getOpenKeys(route);
    });
    return {
      menus,
      selectedKeys,
      openKeys,
      handleMenuClick,
    };
  },
  render() {
    function renderMenuItem(menus: any) {
      return (
        <>
          {menus.map((menu: any) => {
            const { children, meta, path, redirect } = menu;
            const { title, hideInMenu, hideChildrenInMenu } = meta;
            if (hideInMenu) {
              return '';
            } else if (children && children.length > 0 && !hideChildrenInMenu) {
              return (
                <a-sub-menu
                  key={path}
                  v-slots={{
                    title: () => {
                      return <span>{title}</span>;
                    },
                  }}
                >
                  {renderMenuItem(children)}
                </a-sub-menu>
              );
            } else {
              // 由于面包屑导航数据中不记录重定向的路由，为能正确匹配出被选中的菜单，因此存在重定向的菜单key使用重定向后的地址
              return <a-menu-item key={redirect || path}>{title}</a-menu-item>;
            }
          })}
        </>
      );
    }

    return (
      <div class={styles.menuContainer}>
        <a-menu mode='inline' theme='dark' v-model={[this.selectedKeys, 'selectedKeys']} openKeys={this.openKeys} onClick={this.handleMenuClick} style={{ borderRight: 0 }}>
          {renderMenuItem(this.menus)}
        </a-menu>
      </div>
    );
  },
});
