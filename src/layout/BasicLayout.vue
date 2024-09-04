<template>
  <a-layout>
    <a-layout-header> </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <GlobalMenu />
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <breadcrumb class="breadcrumb" />
        <router-view class="route-view" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import GlobalMenu from '@/components/GlobalMenu/Menu';
import breadcrumb from './Breadcrumb.vue';
</script>
<style lang="less" scoped>
.layout-content {
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: #f0f2f5;
  background-size: cover;

  .breadcrumb {
    flex: none;
    display: flex;
    height: @breadcrumbHeight;
    padding-left: 24px;
    align-items: center;
    color: rgba(0, 0, 0, 0.65);
    background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 18%);
  }

  .route-view {
    overflow: auto;
    position: relative;
    margin-top: 2px;
    z-index: 1;
  }
}
</style>
