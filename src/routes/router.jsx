import { createBrowserRouter, Navigate } from 'react-router-dom'
import SidebarLayout from '@/components/layouts/SidebarLayout'
import Login from '@/pages/auth/login'
// import ForgotPassword from '@/pages/auth/forgot-password'
import NotFound from '@/pages/error/404'
import Dashboard from '@/pages/dashboard'
import Flight from '@/pages/flight'
import Hotel from '@/pages/hotel'
import Attraction from '@/pages/attraction'
import Review from '@/pages/review'
import Booking from '@/pages/booking'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: 'login',
        element: <Login />
    },
    // {
    //     path: 'forgot-password',
    //     element: <ForgotPassword />
    // },
    {
        path: '/',
        element: <SidebarLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'flight',
                element: <Flight />
            },
            {
                path: 'hotel',
                element: <Hotel />
            },
            {
                path: 'attraction',
                element: <Attraction />
            },
            {
                path: 'reviews',
                element: <Review />
            },
            {
                path: 'booking',
                element: <Booking />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])
