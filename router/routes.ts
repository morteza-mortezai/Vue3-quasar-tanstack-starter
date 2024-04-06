import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // dashboard layout
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name:'homePage',
        path: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          // auth: true,
        },
      },
      {
        name:'homePage2',
        path: 'home2',
        component: () => import('pages/IndexPage2.vue'),
        meta: {
          // auth: true,
        },
      },

    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'loginPage',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgotPasswordPage',
        component: () => import('pages/auth/ForgotPassword.vue'),
      },
      {
        path: 'register',
        name: 'registerPage',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
