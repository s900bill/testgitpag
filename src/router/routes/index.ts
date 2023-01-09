import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('@/views/Layout/Layout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'Home' },
      },
      {
        path: 'Home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: {
          requireAuth: true,
        },
      },

      {
        name: 'UserList',
        path: 'UserList',
        component: () => import('@/views/User/UserList.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        name: 'EditUser',
        path: 'EditUser',
        component: () => import('@/views/User/EditUser.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        name: 'CreateUser',
        path: 'CreateUser',
        component: () => import('@/views/User/CreateUser.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        name: 'RoomList',
        path: 'RoomList',
        component: () => import('@/views/Room/RoomList.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        name: 'PaymentList',
        path: 'PaymentList',
        component: () => import('@/views/payment/PaymentList.vue'),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requireAuth: false,
      allowBack: false,
    },
  },
  {
    path: '/404',
    name: 'PageNotExist',
    component: () => import('@/views/404.vue'),
    meta: {
      requireAuth: false,
      allowBack: false,
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]

export default routes
