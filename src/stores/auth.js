import { axiosInstance } from '@/plugins/axios'
import router from '@/router'
import { defineStore } from 'pinia'
import { handleError } from '@/helpers/errorHelper'


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    loading: false,
    error: null,
    success: null,
  }),
  getters: {
    token: state => localStorage.getItem('token'),
  },
  actions: {
    async login(credentials) {
      this.loading = true

      try {
        const response = await axiosInstance.post('/login', credentials)

        const token = response.data.token

        localStorage.setItem('token', token)

        this.success = 'Login successful'

        router.push({ name: 'dashboard' })
      } catch (error) {
        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },
    async logout() {
      localStorage.removeItem('token')

      router.push({ name: 'login' })

      this.user = null
      this.error = null
      this.success = 'logout'
    },
    async checkAuth() {
      this.loading = true

      try {
        const response = await axiosInstance.get('/me')

        this.user = response.data.data

        return this.user
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.logout()
        }
      }
      this.loading = false
    },
  },
})

