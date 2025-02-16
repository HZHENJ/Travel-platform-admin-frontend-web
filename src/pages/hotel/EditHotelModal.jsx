import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const EditHotelModal = ({ isOpen, onClose, onSave, hotelData }) => {
    const [formData, setFormData] = useState({
        hotelBookingId: '',
        bookingId: '',
        hotelId: '',
        checkInDate: '',
        checkOutDate: '',
        roomType: '',
        location: '',
        guests: ''
    })

    useEffect(() => {
        if (hotelData) {
            // Format incoming dates to YYYY-MM-DD for input fields
            const formattedData = {
                ...hotelData,
                checkInDate: formatDateForInput(hotelData.checkInDate),
                checkOutDate: formatDateForInput(hotelData.checkOutDate)
            }
            setFormData(formattedData)
        }
    }, [hotelData])

    // Format date string to YYYY-MM-DD for input fields
    const formatDateForInput = (dateString) => {
        if (!dateString) return ''
        try {
            const date = new Date(dateString)
            return date.toISOString().split('T')[0]
        } catch (error) {
            console.error('Date parsing error:', error)
            return ''
        }
    }

    // Format date for API submission (ISO 8601)
    const formatDateForApi = (dateString) => {
        if (!dateString) return null
        try {
            const date = new Date(dateString)
            return date.toISOString()
        } catch (error) {
            console.error('Date formatting error:', error)
            return null
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Format dates for API submission
        const submissionData = {
            ...formData,
            checkInDate: formatDateForApi(formData.checkInDate),
            checkOutDate: formatDateForApi(formData.checkOutDate),
            guests: Number(formData.guests) // Ensure guests is a number
        }
        onSave(submissionData)
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-white">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            Edit Hotel Booking
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
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="hotelId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Hotel ID
                                </label>
                                <input
                                    type="text"
                                    name="hotelId"
                                    id="hotelId"
                                    value={formData.hotelId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="checkInDate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Check-in Date
                                </label>
                                <input
                                    type="date"
                                    name="checkInDate"
                                    id="checkInDate"
                                    value={formData.checkInDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="checkOutDate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Check-out Date
                                </label>
                                <input
                                    type="date"
                                    name="checkOutDate"
                                    id="checkOutDate"
                                    value={formData.checkOutDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="roomType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Room Type
                                </label>
                                <select
                                    name="roomType"
                                    id="roomType"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                >
                                    <option value="">Select room type</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Deluxe">Deluxe</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="guests"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Number of Guests
                                </label>
                                <input
                                    type="number"
                                    name="guests"
                                    id="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    min="1"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
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

EditHotelModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    hotelData: PropTypes.shape({
        hotelBookingId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        hotelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        checkInDate: PropTypes.string,
        checkOutDate: PropTypes.string,
        roomType: PropTypes.string,
        location: PropTypes.string,
        guests: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
}

EditHotelModal.defaultProps = {
    hotelData: null
}

export default EditHotelModal