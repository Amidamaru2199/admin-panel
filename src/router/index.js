import { createRouter, createWebHistory } from 'vue-router'
import TheDashboard from '../views/TheDashboard.vue'
import TheServers from '@/views/TheServers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: TheDashboard,
    },
    {
      path: '/servers',
      name: 'servers',
      component: TheServers,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
