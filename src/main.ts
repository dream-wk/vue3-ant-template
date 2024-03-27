import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { setupStore } from '@/store';
import importAntd from './import-antd';
import './assets/iconfont/iconfont.css';

const app = createApp(App);

// 按需引入要使用的ant vue 组件
importAntd(app);

// Configure store
// 配置 store
setupStore(app);

app.use(router).mount('#app');
