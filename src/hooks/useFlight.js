import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'

export const useFlight = () => {
    const [flightBookings, setFlightBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const fetchFlightBookings = async () => {
        setIsLoading(true)
        setError('')
        try {
            const response = await axios.get(API_ENDPOINTS.FLIGHT.LIST, {
                headers: getAuthHeader()
            })
            const transformedData = response.data.map((booking) => ({
                flightBookingId: booking.id || booking.flightBookingId,
                bookingId: booking.bookingId,
                flightId: booking.flightId,
                seatClass: booking.seatClass || booking.seat,
                passengerName: booking.passengerName || booking.name,
                passengerId: booking.passengerId
            }))
            setFlightBookings(transformedData)
        } catch (err) {
            setError(
                err.response?.data?.message || 'Error fetching flight bookings'
            )
            console.error('Error fetching flight bookings:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const editFlightBooking = async (id, updateData) => {
        setError('')
        try {
            await axios.put(API_ENDPOINTS.FLIGHT.UPDATE(id), updateData, {
                headers: getAuthHeader()
            })
            await fetchFlightBookings() // Refresh the list
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error updating flight booking'
            setError(errorMessage)
            console.error('Error updating flight booking:', err)
            throw new Error(errorMessage)
        }
    }

    const deleteFlightBooking = async (id) => {
        setError('')
        try {
            await axios.delete(API_ENDPOINTS.FLIGHT.DELETE(id), {
                headers: getAuthHeader()
            })
            await fetchFlightBookings()
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error deleting flight booking'
            setError(errorMessage)
            console.error('Error deleting flight booking:', err)
            throw new Error(errorMessage)
        }
    }

    useEffect(() => {
        fetchFlightBookings()
    }, [])

    return {
        flightBookings,
        isLoading,
        error,
        fetchFlightBookings,
        editFlightBooking,
        deleteFlightBooking
    }
}
