import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth.service'

export const useAdmin = () => {
    const [adminData, setAdminData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAdminData = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
                return
            }

            try {
                const data = await authService.getAdminDetails()
                console.log('Admin data received:', data) // For debugging
                if (data && data.username) {
                    setAdminData(data)
                    setError('')
                } else {
                    throw new Error('Invalid admin data received')
                }
            } catch (err) {
                console.error('Error fetching admin data:', err)
                setError(
                    err.response?.data?.message || 'Failed to fetch admin data'
                )
                localStorage.removeItem('token')
                navigate('/login')
            } finally {
                setIsLoading(false)
            }
        }

        fetchAdminData()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('rememberMe')
        navigate('/')
    }

    return {
        adminData,
        isLoading,
        error,
        handleLogout
    }
}
