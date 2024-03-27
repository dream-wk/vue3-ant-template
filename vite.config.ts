import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint'; // 让eslint报错
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx'; // 支持jsx的

const paths = (path: string) => resolve(__dirname, path);
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('Env:', env.NODE_ENV);
  return {
    resolve: {
      //设置别名
      alias: {
        '@': paths('src'),
        '@ass': paths('src/assets'),
        '@css': paths('src/style'),
        '@view': paths('src/views'),
        '@store': paths('src/store'),
        '@util': paths('src/utils'),
        '@api': paths('src/api'),
        '@hook': paths('src/hooks'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/styles/config/index.less')}";`,
          },
          // additionalData: `@import "@/styles/config/index.less";`,
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      }),
    ],
  };
});
