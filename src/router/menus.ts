import { RouteRecordRaw } from 'vue-router';

import { BasicLayout, BlankLayout } from '@/layout';

/**
 * 动态路由
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: BlankLayout,
        meta: {
          title: '一级test1',
          permission: ['test1'],
          notClickable: true,
          redirectToChild: true,
        },
        children: [
          {
            path: '/test1-1',
            name: 'test1-1',
            redirect: '/test1-1List',
            meta: { title: 'test1-1', hideChildrenInMenu: true, keepAlive: true },
            component: BlankLayout,
            children: [
              {
                path: '/test1-1List',
                name: 'test1-1List',
                meta: { title: 'test3', hideInMenu: true, keepAlive: true },
                component: () => import(/* webpackChunkName: "test3" */ '@/views/test1/index.vue'),
              },
              {
                path: '/test1-1Detail',
                name: 'test1-1Detail',
                meta: { title: 'test1-1Detail', keepAlive: false },
                component: () => import(/* webpackChunkName: "test4" */ '@/views/test1/detail.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/test2',
        name: 'test2',
        component: BlankLayout,
        meta: {
          title: '一级test2',
          notClickable: true,
          redirectToChild: true,
        },
        children: [
          {
            path: '/test2-1',
            name: 'test2-1',
            redirect: '/test2-1List',
            meta: { title: 'test2-1', hideChildrenInMenu: true, keepAlive: true },
            component: BlankLayout,
            children: [
              {
                path: '/test2-1List',
                name: 'test2-1List',
                meta: { title: 'test3', hideInMenu: true },
                component: () => import(/* webpackChunkName: "test3" */ '@/views/test2/index.vue'),
              },
              {
                path: '/test2-1Detail',
                name: 'test2-1Detail',
                meta: { title: 'test2-1Detail', hideInMenu: true },
                component: () => import(/* webpackChunkName: "test4" */ '@/views/test2/detail.vue'),
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
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: 'PageNotFound',
      hideInMenu: true,
      hideInTabs: true,
    },
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: {
          title: 'PageNotFound',
          hideBreadcrumb: true,
          hideMenu: true,
        },
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
