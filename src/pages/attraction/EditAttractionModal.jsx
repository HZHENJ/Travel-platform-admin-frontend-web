import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const EditAttractionModal = ({ isOpen, onClose, onSave, attractionData }) => {
    const [formData, setFormData] = useState({
        attractionBookingId: '',
        bookingId: '',
        attractionId: '',
        visitDate: '',
        ticketType: '',
        numberOfTickets: ''
    })
    
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (attractionData) {
            // Format incoming data
            const formattedData = {
                ...attractionData,
                attractionBookingId: String(attractionData.attractionBookingId || ''),
                bookingId: String(attractionData.bookingId || ''),
                attractionId: String(attractionData.attractionId || ''),
                visitDate: formatDateForInput(attractionData.visitDate),
                numberOfTickets: String(attractionData.numberOfTickets || '')
            }
            setFormData(formattedData)
            setErrors({})
        }
    }, [attractionData])

    // Format date string to YYYY-MM-DD for input fields
    const formatDateForInput = (dateString) => {
        if (!dateString) return ''
        try {
            // Split the ISO string and take just the date part
            return dateString.split('T')[0]
        } catch (error) {
            console.error('Date parsing error:', error)
            return ''
        }
    }

    // Format date for API submission (ISO 8601)
    const formatDateForApi = (dateString) => {
        if (!dateString) return null
        try {
            // Append a fixed time to ensure consistent date handling
            return `${dateString}T12:00:00.000Z`
        } catch (error) {
            console.error('Date formatting error:', error)
            return null
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.bookingId.trim()) {
            newErrors.bookingId = 'Booking ID is required'
        }
        
        if (!formData.attractionId.trim()) {
            newErrors.attractionId = 'Attraction ID is required'
        }
        
        if (!formData.visitDate) {
            newErrors.visitDate = 'Visit date is required'
        } else {
            const selectedDate = new Date(formData.visitDate)
            const today = new Date()
            if (selectedDate < today) {
                newErrors.visitDate = 'Visit date cannot be in the past'
            }
        }
        
        if (!formData.ticketType) {
            newErrors.ticketType = 'Ticket type is required'
        }
        
        if (!formData.numberOfTickets) {
            newErrors.numberOfTickets = 'Number of tickets is required'
        } else {
            const ticketCount = Number(formData.numberOfTickets)
            if (isNaN(ticketCount) || ticketCount < 1) {
                newErrors.numberOfTickets = 'Must be at least 1 ticket'
            } else if (ticketCount > 20) {
                newErrors.numberOfTickets = 'Maximum 20 tickets per booking'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        // Clear error when field is modified
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    const formatDataForSubmission = (data) => {
        return {
            ...data,
            // Convert ID fields to numbers if they're numeric strings
            attractionBookingId: data.attractionBookingId ? Number(data.attractionBookingId) : undefined,
            bookingId: data.bookingId ? Number(data.bookingId) : undefined,
            attractionId: data.attractionId ? Number(data.attractionId) : undefined,
            // Format date to ISO string
            visitDate: formatDateForApi(data.visitDate),
            // Convert number of tickets to number
            numberOfTickets: Number(data.numberOfTickets)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (validateForm()) {
            const submissionData = formatDataForSubmission(formData)
            onSave(submissionData)
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-white">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            Edit Attraction Booking
                        </Dialog.Title>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md text-gray-400 hover:text-gray-500"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="bookingId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Booking ID
                                </label>
                                <input
                                    type="text"
                                    name="bookingId"
                                    id="bookingId"
                                    value={formData.bookingId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.bookingId ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                />
                                {errors.bookingId && (
                                    <p className="mt-1 text-sm text-red-500">{errors.bookingId}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="attractionId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Attraction ID
                                </label>
                                <input
                                    type="text"
                                    name="attractionId"
                                    id="attractionId"
                                    value={formData.attractionId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.attractionId ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                />
                                {errors.attractionId && (
                                    <p className="mt-1 text-sm text-red-500">{errors.attractionId}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="visitDate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Visit Date
                                </label>
                                <input
                                    type="date"
                                    name="visitDate"
                                    id="visitDate"
                                    value={formData.visitDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.visitDate ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                />
                                {errors.visitDate && (
                                    <p className="mt-1 text-sm text-red-500">{errors.visitDate}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="ticketType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ticket Type
                                </label>
                                <select
                                    name="ticketType"
                                    id="ticketType"
                                    value={formData.ticketType}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.ticketType ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                >
                                    <option value="">Select ticket type</option>
                                    <option value="Adult">Adult</option>
                                    <option value="Child">Child</option>
                                    <option value="Senior">Senior</option>
                                </select>
                                {errors.ticketType && (
                                    <p className="mt-1 text-sm text-red-500">{errors.ticketType}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="numberOfTickets"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Number of Tickets
                                </label>
                                <input
                                    type="number"
                                    name="numberOfTickets"
                                    id="numberOfTickets"
                                    value={formData.numberOfTickets}
                                    onChange={handleChange}
                                    min="1"
                                    max="20"
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.numberOfTickets ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                />
                                {errors.numberOfTickets && (
                                    <p className="mt-1 text-sm text-red-500">{errors.numberOfTickets}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

EditAttractionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    attractionData: PropTypes.shape({
        attractionBookingId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        attractionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        visitDate: PropTypes.string,
        ticketType: PropTypes.string,
        numberOfTickets: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })
}

EditAttractionModal.defaultProps = {
    attractionData: null
}

export default EditAttractionModal