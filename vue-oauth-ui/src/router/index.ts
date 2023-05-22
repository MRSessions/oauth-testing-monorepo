// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    component: () => import('@/layouts/default/Default.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'standard-flow',
        name: 'Standard Flow',
        component: () => import('@/views/auth-flows/StandardFlow.vue'),
      },
      {
        path: '/implicit-flow',
        name: 'Implicit Flow',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/direct-access',
        name: 'Direct Access',
        component: () => import('@/views/auth-flows/DirectAccess.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login-redirect',
    name: 'LoginRedirect',
    component: () => import('@/views/auth-flows/LoginRedirect.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
