import { RouteRecordRaw } from 'vue-router';

import { BasicLayout, BlankLayout } from '@/layout';

/**
 * 动态路由
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home',
      notClickable: true,
      clearBreadcrumb: true,
    },
    component: BasicLayout,
    redirect: '/test1',
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: BlankLayout,
        redirect: '/test1-1',
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
            meta: { title: 'test1-1', hideChildrenInMenu: true, clearBreadcrumb: true },
            component: BlankLayout,
            children: [
              {
                path: '/test1-1List',
                name: 'test1-1List',
                meta: { title: 'test1', hideInMenu: true, keepAlive: true, clearBreadcrumb: false },
                component: () => import('@/views/test1/index.vue'),
              },
              {
                path: '/test1-Detail',
                name: 'test1-Detail',
                meta: { title: 'test1-Detail' },
                redirect: '/test1-Detail-C',
                component: BlankLayout,
                children: [
                  {
                    path: '/test1-Detail-C',
                    name: 'test1-Detail-C',
                    meta: { title: 'test1-Detail', hideInMenu: true, keepAlive: false, clearBreadcrumb: false },
                    component: () => import('@/views/test1/detail.vue'),
                  },
                  {
                    path: '/test1-Detail-List',
                    name: 'test1-Detail-List',
                    meta: { title: 'test1-Detail-List', hideInMenu: true, keepAlive: false, clearBreadcrumb: false },
                    component: () => import('@/views/test1/detailList.vue'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/test2',
        name: 'test2',
        component: BlankLayout,
        redirect: '/test2-1',
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
            meta: { title: 'test2-1', hideChildrenInMenu: true, keepAlive: true, clearBreadcrumb: true },
            component: BlankLayout,
            children: [
              {
                path: '/test2-1List',
                name: 'test2-1List',
                meta: { title: 'test2', hideInMenu: true },
                component: () => import('@/views/test2/index.vue'),
              },
              {
                path: '/test2-Detail',
                name: 'test2-Detail',
                meta: { title: 'test2-1Detail', hideInMenu: true },
                component: () => import('@/views/test2/detail.vue'),
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
            component: () => import('@/views/test3/index.vue'),
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
    component: () => import('@/views/login/index.vue'),
  },
];
