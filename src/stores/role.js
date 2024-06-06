import { axiosInstance } from "@/plugins/axios"
import router from "@/router"
import { defineStore } from "pinia"
import { handleError } from "@/helpers/errorHelper"

export const useRoleStore = defineStore({
    id: "role",
    state: () => ({
        roles: [],
        loading: false,
        error: null,
        success: null,
    }),
    actions: {
        async fetchRoles() {
            this.loading = true

            try {
                const response = await axiosInstance.get("/role")

                this.roles = response.data.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async fetchRole(roleId) {
            this.loading = true

            try {
                const response = await axiosInstance.get(`/role/${roleId}`)

                return response.data.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async createRole(role) {
            this.loading = true

            try {
                const response = await axiosInstance.post("/role", role)

                this.success = response.data.message

                router.push({ name: "role" })
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async updateRole(role) {
            this.loading = true

            try {
                const response = await axiosInstance.post(`/role/${role.id}`, {
                    ...role,
                    _method: "PUT",
                })

                this.success = response.data.message

                router.push({ name: "role" })
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async deleteRole(roleId) {
            this.loading = true

            try {
                const response = await axiosInstance.delete(`/role/${roleId}`)

                this.success = response.data.message
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
    },
})