const API_URL = import.meta.env.VITE_API_URL

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_URL}/auth/admin/login`,
        ADMIN_ME: `${API_URL}/auth/admin/me`
    },
    FLIGHT: {
        LIST: `${API_URL}/flightBookings`,
        CREATE: `${API_URL}/flightBookings`,
        UPDATE: (id) => `${API_URL}/flightBookings/${id}`,
        DELETE: (id) => `${API_URL}/flightBookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/flightBookings/${id}`
    },
    HOTEL: {
        LIST: `${API_URL}/hotelBookings`,
        CREATE: `${API_URL}/hotelBookings`,
        UPDATE: (id) => `${API_URL}/hotelBookings/${id}`,
        DELETE: (id) => `${API_URL}/hotelBookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/hotelBookings/${id}`
    },
    ATTRACTION: {
        LIST: `${API_URL}/attractionBookings`,
        CREATE: `${API_URL}/attractionBookings`,
        UPDATE: (id) => `${API_URL}/attractionBookings/${id}`,
        DELETE: (id) => `${API_URL}/attractionBookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/attractionBookings/${id}`,
        POPULAR_ATTRACTIONS: `${API_URL}/attractionBookings/popular-attractions`
    },
    REVIEW: {
        LIST: `${API_URL}/reviews`,
        CREATE: `${API_URL}/reviews`,
        UPDATE: (id) => `${API_URL}/reviews/${id}`,
        DELETE: (id) => `${API_URL}/reviews/${id}`,
        GET_BY_ID: (id) => `${API_URL}/reviews/${id}`,
        REPLY: (id) => `${API_URL}/reviews/${id}/reply`
    },
    BOOKING: {
        LIST: `${API_URL}/bookings`,
        CREATE: `${API_URL}/bookings`,
        UPDATE: (id) => `${API_URL}/bookings/${id}`,
        DELETE: (id) => `${API_URL}/bookings/${id}`,
        GET_BY_ID: (id) => `${API_URL}/bookings/${id}`,
        STATISTICS: {
            MONTHLY: `${API_URL}/bookings/statistics/monthly`,
            SUMMARY: `${API_URL}/bookings/statistics/summary`,
            TYPE_DISTRIBUTION: `${API_URL}/bookings/statistics/type-distribution`
        }
    },
    DASHBOARD: {
        YEARLY_BOOKINGS: `${API_URL}/dashboard/yearlyBookings`,
        BOOKINGS_BY_TYPE: `${API_URL}/dashboard/bookingsByType`,
        MOST_FREQUENT_PLACES: `${API_URL}/dashboard/mostFrequentPlaces`,
        REVIEW_SATISFACTION: `${API_URL}/reviews/satisfaction`,
        TRENDING_PLACES: `${API_URL}/attractionBookings/popular-attractions`
    }
}
