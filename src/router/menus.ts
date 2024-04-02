import { RouteRecordRaw } from 'vue-router';

import { BasicLayout, BlankLayout } from '@/layout';

/**
 * 动态路由
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: BasicLayout,
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: BlankLayout,
        meta: {
          title: '一级',
          permission: [],
          notClickable: true,
          redirectToChild: true,
        },
        children: [
          {
            path: '/test2',
            name: 'test2',
            redirect: '/test3',
            meta: { title: 'test2', hideChildrenInMenu: true },
            component: BlankLayout,
            children: [
              {
                path: '/test3',
                name: 'test3',
                meta: { title: 'test3', hideInMenu: true },
                component: () => import(/* webpackChunkName: "test3" */ '@/components/HelloWorld.vue'),
              },
              {
                path: '/test4',
                name: 'test4',
                meta: { title: 'test4', hideInMenu: true },
                component: () => import(/* webpackChunkName: "test4" */ '@/components/test4.vue'),
              },
            ],
          },
        ],
      },

      {
        path: '/personalInfo',
        name: 'PersonalInfo',
        component: BlankLayout,
        redirect: '/personalInfo',
        meta: {
          title: '个人信息',
          redirectToChild: true,
          notClickable: true,
          hideChildrenInMenu: true,
          hideInMenu: true,
        },
        children: [
          {
            path: '/personalInfo',
            name: 'PersonalInfo',
            component: () => import(/* webpackChunkName: "personal-info" */ '@/components/test4.vue'),
            meta: { title: '个人信息' },
          },
        ],
      },
    ],
  },
];

/**
 * 基础路由
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
];
