import permissionRoutes from './permission'
import roleRoutes from './role'

const appRouter = [
    {
        path: '/',
        name: 'dashboard',
        meta: { requiresAuth: true },
        component: () => import('../views/pages/dashboard/index.vue')
    },
    ...roleRoutes,
    ...permissionRoutes,
]

export default appRouter