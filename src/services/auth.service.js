import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'

export const authService = {
    login: async (credentials) => {
        const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
        return response.data
    },

    getAdminDetails: async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(API_ENDPOINTS.AUTH.ADMIN_ME, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
}
