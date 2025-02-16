import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'

export const useAttraction = () => {
    const [attractionBookings, setAttractionBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const fetchAttractionBookings = async () => {
        setIsLoading(true)
        setError('')
        try {
            const response = await axios.get(API_ENDPOINTS.ATTRACTION.LIST, {
                headers: getAuthHeader()
            })
            const transformedData = response.data.map((booking) => ({
                attractionBookingId: booking.id || booking.attractionBookingId,
                bookingId: booking.bookingId,
                attractionId: booking.attractionId,
                visitDate: booking.visitDate,
                ticketType: booking.ticketType,
                numberOfTickets: booking.numberOfTickets
            }))
            setAttractionBookings(transformedData)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Error fetching attraction bookings'
            )
            console.error('Error fetching attraction bookings:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const editAttractionBooking = async (id, updateData) => {
        setError('')
        try {
            await axios.put(API_ENDPOINTS.ATTRACTION.UPDATE(id), updateData, {
                headers: getAuthHeader()
            })
            await fetchAttractionBookings()
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                'Error updating attraction booking'
            setError(errorMessage)
            console.error('Error updating attraction booking:', err)
            throw new Error(errorMessage)
        }
    }

    const deleteAttractionBooking = async (id) => {
        setError('')
        try {
            await axios.delete(API_ENDPOINTS.ATTRACTION.DELETE(id), {
                headers: getAuthHeader()
            })
            await fetchAttractionBookings()
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                'Error deleting attraction booking'
            setError(errorMessage)
            console.error('Error deleting attraction booking:', err)
            throw new Error(errorMessage)
        }
    }

    useEffect(() => {
        fetchAttractionBookings()
    }, [])

    return {
        attractionBookings,
        isLoading,
        error,
        fetchAttractionBookings,
        editAttractionBooking,
        deleteAttractionBooking
    }
}
