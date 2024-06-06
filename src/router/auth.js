const authRouter = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/account/login.vue'),
        meta: { requiresUnauth: true },
    }
]

export default authRouter