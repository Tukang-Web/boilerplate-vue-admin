import { axiosInstance } from "@/plugins/axios"
import router from "@/router"
import { defineStore } from "pinia"
import { handleError } from "@/helpers/errorHelper"

export const usePermissionStore = defineStore({
    id: "permission",
    state: () => ({
        permissions: [],
        loading: false,
        error: null,
        success: null,
    }),
    actions: {
        async fetchPermissions() {
            this.loading = true

            try {
                const response = await axiosInstance.get("/permission")

                this.permissions = response.data.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async fetchPermission(permissionId) {
            this.loading = true

            try {
                const response = await axiosInstance.get(`/permission/${permissionId}`)

                return response.data.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async createPermission(permission) {
            this.loading = true

            try {
                const response = await axiosInstance.post("/permission", permission)

                this.success = response.data.message

                router.push({ name: "permission" })
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async updatePermission(permission) {
            this.loading = true

            try {
                const response = await axiosInstance.post(`/permission/${permission.id}`, {
                    ...permission,
                    _method: 'PUT'
                });

                this.success = response.data.message

                router.push({ name: "permission" })
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async deletePermission(permissionId) {
            this.loading = true

            try {
                const response = await axiosInstance.delete(`/permission/${permissionId}`)

                this.success = response.data.message
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
    },
})