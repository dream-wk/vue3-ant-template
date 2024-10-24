<template>
  <button type="button" @click="handleToDetail">tiaoz</button>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const handleToDetail = () => {
  router.push({ name: 'test1-Detail-List', query: { aaa: 123 } });
};
</script>
