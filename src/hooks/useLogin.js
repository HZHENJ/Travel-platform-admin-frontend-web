import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth.service'

export const useLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const data = await authService.login({
                username: formData.username,
                password: formData.password
            })

            if (data.token) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', formData.username)

                if (formData.rememberMe) {
                    localStorage.setItem('rememberMe', 'true')
                }
            }

            navigate('/dashboard')
        } catch (err) {
            console.error('Login error:', err)
            setError(
                err.response?.data?.message ||
                    'Invalid credentials. Please try again.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return {
        formData,
        error,
        isLoading,
        handleChange,
        handleSubmit
    }
}
