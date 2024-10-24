<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cache">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts" setup>
import { useKeepAliveStore } from '@/store/modules/keepAlive';
const { cache } = useKeepAliveStore();
</script>
<style lang="less" scoped></style>
