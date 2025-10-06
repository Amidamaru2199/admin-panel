import { createRouter, createWebHistory } from 'vue-router'
import TheDashboard from '../views/TheDashboard.vue'
import TheServers from '@/views/TheServers.vue'
import TheTariffs from '@/views/TheTariffs.vue'
import TheUsers from '@/views/TheUsers.vue'
import TheUtmCodes from '@/views/TheUtmCodes.vue'
import TheNewsletter from '@/views/TheNewsletter.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/dashboard'
		},
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
		{
			path: '/tariffs',
			name: 'tariffs',
			component: TheTariffs,
		},
		{
			path: '/users',
			name: 'users',
			component: TheUsers,
		},
		{
			path: '/utm',
			name: 'utm',
			component: TheUtmCodes,
		},
		{
			path: '/newsletter',
			name: 'newsletter',
			component: TheNewsletter,
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
