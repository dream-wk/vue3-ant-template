<template>
  <router-view>
    <template #default="{ Component, route }">
      keepalive： {{ route.meta.keepAlive }}
      <keep-alive>
        <component v-if="route.meta.keepAlive" :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component v-if="!$route.meta.keepAlive" :is="Component" :key="route.fullPath" />
    </template>
  </router-view>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'BlankLayout',
  setup() {
    // const route = useRoute();
    const count = ref(1);
    return {
      count,
    };
  },
});
</script>
