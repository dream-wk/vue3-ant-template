<template>
  <a-breadcrumb class="breadcrumb-wrap" :class="{ 'breadcrumb-hide': hideBreadcrumb }" separator="/">
    <template v-if="!hideBreadcrumb">
      <a-breadcrumb-item v-for="(item, index) in breadcrumbStore.breadcrumb" :key="index">
        <span v-if="index === breadcrumbStore.breadcrumb.length - 1">
          {{ item.meta.title }}
        </span>
        <span v-else-if="item.meta.breadcrumbNotClickable">
          {{ item.meta.title }}
        </span>
        <router-link v-else :to="item.path">
          {{ item.meta.title }}
        </router-link>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBreadcrumbStore } from '@/store/modules/breadcrumb';

const route = useRoute();
const breadcrumbStore = useBreadcrumbStore();

const hideBreadcrumb = computed(() => {
  const { meta } = route;
  return !!meta.hideBreadcrumb;
});

console.log(breadcrumbStore.breadcrumb);

watch(
  () => route,
  (newRoute, oldRoute) => {
    breadcrumbStore.generateBreadcrumb(newRoute, oldRoute);
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>
<style lang="less" scoped>
.breadcrumb-hide {
  height: 24px !important;
}

.breadcrumb-wrap {
  background-color: #fff;
  padding: 16px;
}

:deep {
  .ant-breadcrumb-link {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);

    a {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .ant-breadcrumb-separator {
    color: rgba(0, 0, 0, 0.65);
    padding: 0 2px;
  }
}
</style>
