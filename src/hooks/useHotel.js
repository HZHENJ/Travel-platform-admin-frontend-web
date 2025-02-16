import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'

export const useHotel = () => {
    const [hotelBookings, setHotelBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const fetchHotelBookings = async () => {
        setIsLoading(true)
        setError('')
        try {
            const response = await axios.get(API_ENDPOINTS.HOTEL.LIST, {
                headers: getAuthHeader()
            })
            const transformedData = response.data.map((booking) => ({
                hotelBookingId: booking.id || booking.hotelBookingId,
                bookingId: booking.bookingId,
                hotelId: booking.hotelId,
                checkInDate: booking.checkInDate,
                checkOutDate: booking.checkOutDate,
                roomType: booking.roomType,
                location: booking.location,
                guests: booking.guests
            }))
            setHotelBookings(transformedData)
        } catch (err) {
            setError(
                err.response?.data?.message || 'Error fetching hotel bookings'
            )
            console.error('Error fetching hotel bookings:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const editHotelBooking = async (id, updateData) => {
        setError('')
        try {
            await axios.put(API_ENDPOINTS.HOTEL.UPDATE(id), updateData, {
                headers: getAuthHeader()
            })
            await fetchHotelBookings() // Refresh the list
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error updating hotel booking'
            setError(errorMessage)
            console.error('Error updating hotel booking:', err)
            throw new Error(errorMessage)
        }
    }

    const deleteHotelBooking = async (id) => {
        setError('')
        try {
            await axios.delete(API_ENDPOINTS.HOTEL.DELETE(id), {
                headers: getAuthHeader()
            })
            await fetchHotelBookings()
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error deleting hotel booking'
            setError(errorMessage)
            console.error('Error deleting hotel booking:', err)
            throw new Error(errorMessage)
        }
    }

    useEffect(() => {
        fetchHotelBookings()
    }, [])

    return {
        hotelBookings,
        isLoading,
        error,
        fetchHotelBookings,
        editHotelBooking,
        deleteHotelBooking
    }
}
