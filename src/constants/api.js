const API_URL = import.meta.env.VITE_API_URL

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_URL}/api/auth/admin/login`,
        ADMIN_ME: `${API_URL}/api/auth/admin/me`
    },
    FLIGHT: {
        LIST: `${API_URL}/api/flightBookings`,
        CREATE: `${API_URL}/api/flightBookings`,
        UPDATE: (id) => `${API_URL}/api/flightBookings/${id}`,
        DELETE: (id) => `${API_URL}/api/flightBookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/api/flightBookings/${id}`
    },
    HOTEL: {
        LIST: `${API_URL}/api/hotelBookings`,
        CREATE: `${API_URL}/api/hotelBookings`,
        UPDATE: (id) => `${API_URL}/api/hotelBookings/${id}`,
        DELETE: (id) => `${API_URL}/api/hotelBookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/api/hotelBookings/${id}`
    },
    ATTRACTION: {
        LIST: `${API_URL}/api/attractionBookings`,
        CREATE: `${API_URL}/api/attractionBookings`,
        UPDATE: (id) => `${API_URL}/api/attractionBookings/${id}`,
        DELETE: (id) => `${API_URL}/api/attractionBookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/api/attractionBookings/${id}`,
        POPULAR_ATTRACTIONS: `${API_URL}/api/attractionBookings/popular-attractions`
    },
    REVIEW: {
        LIST: `${API_URL}/api/reviews`,
        CREATE: `${API_URL}/api/reviews`,
        UPDATE: (id) => `${API_URL}/api/reviews/${id}`,
        DELETE: (id) => `${API_URL}/api/reviews/${id}`,
        GET_BY_ID: (id) => `${API_URL}/api/reviews/${id}`,
        REPLY: (id) => `${API_URL}/api/reviews/${id}/reply`
    },
    BOOKING: {
        LIST: `${API_URL}/api/bookings`,
        CREATE: `${API_URL}/api/bookings`,
        UPDATE: (id) => `${API_URL}/api/bookings/${id}`,
        DELETE: (id) => `${API_URL}/api/bookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/api/bookings/${id}`,
        STATISTICS: {
            MONTHLY: `${API_URL}/api/bookings/statistics/monthly`,
            SUMMARY: `${API_URL}/api/bookings/statistics/summary`,
            TYPE_DISTRIBUTION: `${API_URL}/api/bookings/statistics/type-distribution`
        }
    },
    DASHBOARD: {
        YEARLY_BOOKINGS: `${API_URL}/api/dashboard/yearlyBookings`,
        BOOKINGS_BY_TYPE: `${API_URL}/api/dashboard/bookingsByType`,
        MOST_FREQUENT_PLACES: `${API_URL}/api/dashboard/mostFrequentPlaces`,
        REVIEW_SATISFACTION: `${API_URL}/api/reviews/satisfaction`,
        TRENDING_PLACES: `${API_URL}/api/attractionBookings/popular-attractions`
    }
}
