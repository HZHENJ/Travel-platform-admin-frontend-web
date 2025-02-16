import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'
import { formatDate } from '@/utilities/formatDate'

export const useReview = () => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const fetchReviews = async () => {
        setIsLoading(true)
        setError('')
        try {
            const response = await axios.get(API_ENDPOINTS.REVIEW.LIST, {
                headers: getAuthHeader()
            })
            const transformedData = response.data.map((review) => ({
                reviewId: review.id || review.reviewId,
                userId: review.userId,
                itemType: review.itemType,
                itemId: review.itemId,
                rating: review.rating,
                comment: review.comment,
                reply: review.reply,
                createdAt: formatDate(review.createdAt),
                updatedAt: formatDate(review.updatedAt)
            }))
            setReviews(transformedData)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching reviews')
            console.error('Error fetching reviews:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const editReview = async (id, updateData) => {
        setError('')
        try {
            await axios.put(API_ENDPOINTS.REVIEW.UPDATE(id), updateData, {
                headers: getAuthHeader()
            })
            await fetchReviews() // Refresh the list
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error updating review'
            setError(errorMessage)
            console.error('Error updating review:', err)
            throw new Error(errorMessage)
        }
    }

    const deleteReview = async (id) => {
        setError('')
        try {
            await axios.delete(API_ENDPOINTS.REVIEW.DELETE(id), {
                headers: getAuthHeader()
            })
            await fetchReviews()
            return true
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error deleting review'
            setError(errorMessage)
            console.error('Error deleting review:', err)
            throw new Error(errorMessage)
        }
    }

    const addReply = async (reviewId, reply) => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.REVIEW.REPLY(reviewId),
                { reply },
                {
                    headers: getAuthHeader()
                }
            )
            await fetchReviews() // Refresh the list
            return response.data
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error adding reply'
            setError(errorMessage)
            console.error('Error adding reply:', err)
            throw new Error(errorMessage)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    return {
        reviews,
        isLoading,
        error,
        fetchReviews,
        editReview,
        deleteReview,
        addReply
    }
}
