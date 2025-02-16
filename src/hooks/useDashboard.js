import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'

export const useDashboard = () => {
    const [totalBookings, setTotalBookings] = useState(0)
    const [bookingTypeCounts, setBookingTypeCounts] = useState({})
    const [mostVisitedAttractions, setMostVisitedAttractions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.BOOKING.LIST, {
                    headers: getAuthHeader()
                })
                const data = response.data

                setTotalBookings(data.length)

                const counts = data.reduce((acc, booking) => {
                    acc[booking.bookingType] =
                        (acc[booking.bookingType] || 0) + 1
                    return acc
                }, {})
                setBookingTypeCounts(counts)

                const attractionCounts = data.reduce((acc, booking) => {
                    acc[booking.attractionName] =
                        (acc[booking.attractionName] || 0) + 1
                    return acc
                }, {})

                const sortedAttractions = Object.entries(attractionCounts)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .slice(0, 10)
                    .map(([name, visits]) => ({ name, visits }))

                setMostVisitedAttractions(sortedAttractions)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookingData()
    }, [])

    return {
        totalBookings,
        bookingTypeCounts,
        mostVisitedAttractions,
        loading,
        error
    }
}
