<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';

defineProps<{ msg: string }>();

var count = ref(0);
const userStore = useUserStore();
const handleAsyncChange = () => {
  userStore.updateName('wk');
};
const router = useRouter();
const handleToDetail = () => {
  router.push({ path: '/test4' });
};
</script>

<template>
  <div class="allCon">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <h1>{{ msg }}</h1>
    <div>userStore:{{ userStore.name }}</div>
    <button type="button" @click="handleAsyncChange">异步改变state</button>

    <button type="button" @click="handleToDetail">详情页跳转测试</button>

    <div class="card">
      <button class="read-the-docs" type="button" @click="count++">count is {{ count }}</button>
    </div>
    <div class="elli-test">testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>

    <p>
      <a href="https://juejin.cn/user/3879548107651966" target="_blank">了解更多我的文章</a>
    </p>
  </div>
</template>

<style lang="less" scoped>
.allCon {
  margin: 0;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

.read-the-docs {
  background-color: @content-bg;
}
.elli-test {
  width: 100px;
  .ellipsis-mult(5); /* 将会生成一个最多显示 2 行的文字截断效果 */
}
</style>
