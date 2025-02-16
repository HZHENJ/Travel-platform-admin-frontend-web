import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'
import { formatDate } from '@/utilities/formatDate'

export const useBooking = () => {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const formatApiDate = (date) => {
        if (!date) return ''
        const d = new Date(date)
        if (isNaN(d.getTime())) return date
        return d.toISOString()
    }

    const fetchBookings = async () => {
        setIsLoading(true)
        setError('')
        try {
            const response = await axios.get(API_ENDPOINTS.BOOKING.LIST, {
                headers: getAuthHeader()
            })
            const transformedData = response.data.map((booking) => ({
                ...booking,
                displayCreatedAt: formatDate(booking.createdAt),
                displayUpdatedAt: formatDate(booking.updatedAt),
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }))
            setBookings(transformedData)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching bookings')
            console.error('Error fetching bookings:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const editBooking = async (id, updateData) => {
        setError('')
        try {
            const apiData = {
                ...updateData,
                createdAt: formatApiDate(updateData.createdAt),
                updatedAt: formatApiDate(new Date())
            }
            await axios.put(API_ENDPOINTS.BOOKING.UPDATE(id), apiData, {
                headers: getAuthHeader()
            })
            await fetchBookings()
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error updating booking'
            setError(errorMessage)
            console.error('Error updating booking:', err)
            throw new Error(errorMessage)
        }
    }

    const deleteBooking = async (id) => {
        setError('')
        try {
            await axios.delete(API_ENDPOINTS.BOOKING.DELETE(id), {
                headers: getAuthHeader()
            })
            await fetchBookings()
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error deleting booking'
            setError(errorMessage)
            console.error('Error deleting booking:', err)
            throw new Error(errorMessage)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    return {
        bookings,
        isLoading,
        error,
        fetchBookings,
        editBooking,
        deleteBooking
    }
}
