const publicRouter = [
    {
        path: '/pages/maintenance',
        name: 'Maintenance',
        meta: { authRequired: true },
        component: () => import('../views/pages/utility/maintenance.vue')
    },
    {
        path: '/pages/coming-soon',
        name: 'Coming-soon',
        meta: { authRequired: true },
        component: () => import('../views/pages/utility/coming-soon.vue')
    },
    {
        path: '/pages/error-404',
        name: 'Error 404',
        meta: { authRequired: true },
        component: () => import('../views/pages/utility/error-404.vue')
    },
    {
        path: '/pages/error-500',
        name: 'Error 500',
        meta: { authRequired: true },
        component: () => import('../views/pages/utility/error-500.vue')
    },
]

export default publicRouter
