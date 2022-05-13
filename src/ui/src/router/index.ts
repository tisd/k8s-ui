import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/pods',
      name: 'pods',
      component: () => import('@/components/PodList.vue')
    },
    {
      path: '/pods/:namespace/:podName',
      name: 'podView',
      component: () => import('@/components/PodView.vue')
    },
    {
      path: '/deployments',
      name: 'deployments',
      component: () => import('@/components/DeploymentList.vue')
    },
    {
      path: '/nodes',
      name: 'nodes',
      component: () => import('@/components/NodeList.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
