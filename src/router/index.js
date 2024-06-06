import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'history',

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});


router.beforeEach(async (to, from, next) => {
  document.title = to.name ? to.name.charAt(0).toUpperCase() + to.name.slice(1) + ' | App Name' : 'App Name'

  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    try {
      if (!authStore.user) {
        await authStore.checkAuth()
      }

      const userPermissions = authStore.user?.permissions || []

      if (to.meta.permissions) {
        const hasPermission = to.meta.permissions.every(permission => userPermissions.includes(permission))
        if (!hasPermission) {
          next({ name: '403' })
          return
        }
      }

      next()
    } catch (error) {
      next({ name: 'login' })
    }
  } else if (to.meta.requiresUnauth && authStore.token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
