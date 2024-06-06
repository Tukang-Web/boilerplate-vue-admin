const roleRoutes = [
    {
        path: '/roles',
        name: 'role',
        component: () => import('@/views/pages/role/roles.vue'),
        meta: { requiresAuth: true, permission: 'role-list' }
    },
    {
        path: '/role/create',
        name: 'role-create',
        component: () => import('@/views/pages/role/role-create.vue'),
        meta: { requiresAuth: true, permission: 'role-create' }
    },
    {
        path: '/role/edit/:id',
        name: 'role-edit',
        component: () => import('@/views/pages/role/role-edit.vue'),
        meta: { requiresAuth: true, permission: 'role-edit' }
    },
    {
        path: '/role/:id',
        name: 'role-view',
        component: () => import('@/views/pages/role/role.vue'),
        meta: { requiresAuth: true, permission: 'role-list' }
    }
]

export default roleRoutes