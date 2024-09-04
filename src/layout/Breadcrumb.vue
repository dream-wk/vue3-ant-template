<template>
  <div class="breadcrumb">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(item, index) in crumbs" :key="item.name" :to="item.path" class="bread-item">
        <span :class="{ text: index !== crumbs.length - 1 }" @click="routeTo(item)">
          {{ item.path }}
        </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
// import { HomeOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const crumbs: any = ref([]);
watch(
  () => route.path,
  () => {
    const { name, fullPath, meta, matched } = route;
    if (fullPath === '/' || fullPath === '/home') {
      crumbs.value = [];
      return;
    }
    const result: any[] = [];
    const len = matched.length;
    console.log(matched);

    matched.forEach((item: any, index: number) => {
      // 由于部分页面会在beforeEnter时变更meta信息，如编辑页面会根据id变更title，因此最后一个路由不从matched中获取
      if (len - index <= 1) {
        return;
      }
      const { name, path, meta, redirect, children } = item;
      const { notClickable } = meta;
      // path为‘/’或者重定向地址与下一个matched路由的地址一致则不添加至面包屑
      if (path !== '/' && path !== '/home' && meta.redirectToChild !== true && (!redirect || redirect !== matched[index + 1].path)) {
        result.push({
          name,
          path: redirect || path, // 存在重定向地址则直接使用重定向地址
          meta,
          children,
          notClickable,
        });
      }
    });
    result.push({
      name,
      path: fullPath,
      meta,
    });
    console.log(crumbs);

    crumbs.value = result;
  },
  {
    immediate: true,
  },
);

/**
 * 跳转到平台首页
 */
// const goHome = () => {
//   router.push({ name: 'home' });
// };

/**
 * 面包屑跳转
 */
const routeTo = (item: any) => {
  const { params } = router.currentRoute.value;
  let pm = {};
  Object.keys(params).forEach((key) => {
    const hasId = item.path.indexOf(`:${key}?`) > -1;
    if (hasId) pm[key] = params[key];
  });
  if (useRoute.name !== item.name) {
    router.push({ name: item.name, params: pm });
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  width: 100%;
  height: 36px;
  margin-bottom: 5px;
  padding-left: 24px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.18);

  .icon {
    color: #8c8c8c;
    font-size: 13px;
    // margin-right: 8px;

    &:hover {
      color: #007aff;
    }
  }

  .bread-item {
    font-family: AlibabaPuHuiTi;

    :deep {
      .ant-breadcrumb-link {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);

        a {
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }

    .text {
      cursor: pointer;
      border-radius: 2px;

      &:hover {
        background-color: #f0f2f5;
      }
    }
  }
}

.multi-tab {
  background-color: #f0f2f5;
  box-shadow: none;
}
</style>
