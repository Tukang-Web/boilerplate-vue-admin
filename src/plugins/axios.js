import axios from 'axios'

const token = localStorage.getItem('token')

axios.defaults.baseURL = import.meta.env.VITE_APP_API_ENDPOINT
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
)


export const axiosInstance = axios
