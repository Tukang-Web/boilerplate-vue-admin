const permissionRoutes = [
    {
        path: '/permissions',
        name: 'permission',
        component: () => import('@/views/pages/permission/permissions.vue'),
        meta: { requiresAuth: true, permission: 'permission-list' }
    },
    {
        path: '/permission/create',
        name: 'permission-create',
        component: () => import('@/views/pages/permission/permission-create.vue'),
        meta: { requiresAuth: true, permission: 'permission-create' }
    },
    {
        path: '/permission/edit/:id',
        name: 'permission-edit',
        component: () => import('@/views/pages/permission/permission-edit.vue'),
        meta: { requiresAuth: true, permission: 'permission-edit' }
    },
    {
        path: '/permission/:id',
        name: 'permission-view',
        component: () => import('@/views/pages/permission/permission.vue'),
        meta: { requiresAuth: true, permission: 'permission-list' }
    }
]

export default permissionRoutes