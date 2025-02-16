import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import Calendar from '@/components/ui/Calendar'
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton'
import { Alert } from '@/components/ui/Alert'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'

import AreaChart from '@/components/charts/AreaChart'
import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'
import TrendingPlaces from '@/components/TrendingPlaces'
import MostFrequentPlaces from '@/components/MostFrequentPlaces'

import { formatDate } from '@/utilities/formatDate'
import PropTypes from 'prop-types'

// Latest Bookings Component
const LatestBookings = ({ bookings }) => {
    return (
        <Card className="col-span-2 p-6">
            <h3 className="mb-4 text-lg font-medium">Latest Bookings</h3>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.bookingId}
                        className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                    >
                        <div>
                            <p className="font-medium">
                                Booking #{booking.bookingId} -{' '}
                                {booking.bookingType}
                            </p>
                            <p className="text-sm text-gray-500">
                                Created: {formatDate(booking.createdAt)}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span
                                className={`rounded-full px-3 py-1 text-sm ${
                                    booking.status === 'Confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : booking.status === 'Pending'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {booking.status}
                            </span>
                            <span className="font-medium">
                                ${booking.totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

LatestBookings.propTypes = {
    bookings: PropTypes.arrayOf(
        PropTypes.shape({
            bookingId: PropTypes.number.isRequired,
            bookingType: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            totalAmount: PropTypes.number.isRequired
        })
    ).isRequired
}

LatestBookings.defaultProps = {
    bookings: []
}

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [error, setError] = useState('')
    const [dashboardData, setDashboardData] = useState({
        latestBookings: [],
        flightBookings: [],
        hotelBookings: [],
        attractionBookings: []
    })
    const [bookingsByType, setBookingsByType] = useState({
        data: [],
        categories: []
    })
    const [yearlyBookings, setYearlyBookings] = useState({
        data: [],
        categories: []
    })
    const [satisfactionData, setSatisfactionData] = useState({
        data: [],
        labels: []
    })
    const [popularAttractions, setPopularAttractions] = useState([])

    // Add auth header function
    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const fetchDashboardData = useCallback(async () => {
        try {
            const [
                bookingsRes,
                flightRes,
                hotelRes,
                attractionRes,
                bookingTypeRes,
                yearlyBookingsRes,
                satisfactionRes,
                popularAttractionsRes
            ] = await Promise.all([
                axios.get(API_ENDPOINTS.BOOKING.LIST, {
                    headers: getAuthHeader()
                }),
                axios.get(API_ENDPOINTS.FLIGHT.LIST, {
                    headers: getAuthHeader()
                }),
                axios.get(API_ENDPOINTS.HOTEL.LIST, {
                    headers: getAuthHeader()
                }),
                axios.get(API_ENDPOINTS.ATTRACTION.LIST, {
                    headers: getAuthHeader()
                }),
                axios.get(API_ENDPOINTS.DASHBOARD.BOOKINGS_BY_TYPE, {
                    headers: getAuthHeader()
                }),
                axios.get(API_ENDPOINTS.DASHBOARD.YEARLY_BOOKINGS, {
                    headers: getAuthHeader()
                }),
                axios.get(API_ENDPOINTS.DASHBOARD.REVIEW_SATISFACTION, {
                    headers: getAuthHeader()
                }),
                axios.get(API_ENDPOINTS.ATTRACTION.POPULAR_ATTRACTIONS, {
                    headers: getAuthHeader()
                })
            ])

            // Get latest 4 bookings
            const latestBookings = bookingsRes.data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4)

            // Transform bookingTypeRes.data
            const bookingTypeData = {
                data: [
                    {
                        name: 'Bookings',
                        data: bookingTypeRes.data.map((item) => item.count)
                    }
                ],
                categories: bookingTypeRes.data.map((item) => item.type)
            }

            // Transform yearlyBookingsRes.data
            const yearlyBookingsData = {
                data: yearlyBookingsRes.data.map((item) => item.count),
                categories: yearlyBookingsRes.data.map((item) => item.month)
            }

            const satisfactionTransformed = {
                data: [
                    satisfactionRes.data.satisfied,
                    satisfactionRes.data.unsatisfied
                ],
                labels: ['Satisfied', 'Unsatisfied']
            }

            // Set popular attractions data
            const topAttractions = popularAttractionsRes.data
                .sort((a, b) => b.bookingCount - a.bookingCount)
                .slice(0, 5)

            setPopularAttractions(topAttractions)
            setBookingsByType(bookingTypeData)
            setYearlyBookings(yearlyBookingsData)
            setSatisfactionData(satisfactionTransformed)
            setDashboardData({
                latestBookings,
                flightBookings: flightRes.data || [],
                hotelBookings: hotelRes.data || [],
                attractionBookings: attractionRes.data || []
            })
        } catch (err) {
            setError('Failed to fetch dashboard data')
            console.error('Dashboard data fetch error:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        setIsMounted(true)
        fetchDashboardData()
    }, [fetchDashboardData])

    const handleDateSelect = (date) => {
        console.log('Selected date:', date)
    }

    if (isLoading) {
        return <DashboardSkeleton />
    }

    if (error) {
        return (
            <div className="px-4 sm:px-6 lg:px-8">
                <Alert message={error} />
            </div>
        )
    }

    // Transform popular attractions for MostFrequentPlaces component
    const mostFrequentData = {
        places: popularAttractions.map((item) => item.attractionName),
        visits: popularAttractions.map((item) => item.bookingCount)
    }

    return (
        <div className="space-y-6">
            {/* Top row */}
            <div className="grid grid-cols-3 gap-6">
                <Card className="col-span-1 p-6">
                    {isMounted && (
                        <AreaChart
                            title="Total Bookings Yearly"
                            data={yearlyBookings.data}
                            categories={yearlyBookings.categories}
                        />
                    )}
                </Card>

                <Card className="col-span-1 p-6">
                    {isMounted && (
                        <BarChart
                            title="Bookings Type Yearly"
                            data={bookingsByType.data}
                            categories={bookingsByType.categories}
                            colors={['#14b8a6', '#0d9488']}
                            legend={true}
                        />
                    )}
                </Card>

                <Card className="col-span-1 p-6">
                    <h3 className="mb-4 text-lg font-medium">Trip Planning</h3>
                    <Calendar
                        onDateSelect={handleDateSelect}
                        visitDates={dashboardData.attractionBookings.map(
                            (booking) => booking.visitDate
                        )}
                    />
                </Card>
            </div>

            {/* Middle section */}
            <TrendingPlaces attractions={mostFrequentData} />

            {/* Bottom row */}
            <div className="grid grid-cols-4 gap-6">
                {isMounted && <MostFrequentPlaces data={mostFrequentData} />}

                {/* Latest Bookings */}
                {isMounted && (
                    <LatestBookings bookings={dashboardData.latestBookings} />
                )}

                <Card className="pt-6 pl-6">
                    {isMounted && (
                        <PieChart
                            title="Visitor Satisfaction"
                            data={satisfactionData.data}
                            labels={satisfactionData.labels}
                            type="donut"
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
