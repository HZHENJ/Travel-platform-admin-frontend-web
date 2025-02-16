import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const EditFlightModal = ({ isOpen, onClose, onSave, flightData }) => {
    const [formData, setFormData] = useState({
        flightBookingId: '',
        bookingId: '',
        flightId: '',
        seatClass: '',
        passengerName: '',
        passengerId: ''
    })
    
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (flightData) {
            // Ensure all ID fields are strings for form handling
            const formattedData = {
                ...flightData,
                flightBookingId: String(flightData.flightBookingId || ''),
                bookingId: String(flightData.bookingId || ''),
                flightId: String(flightData.flightId || ''),
                passengerId: String(flightData.passengerId || '')
            }
            setFormData(formattedData)
            setErrors({})
        }
    }, [flightData])

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.bookingId.trim()) {
            newErrors.bookingId = 'Booking ID is required'
        }
        
        if (!formData.flightId.trim()) {
            newErrors.flightId = 'Flight ID is required'
        }
        
        if (!formData.seatClass) {
            newErrors.seatClass = 'Seat class is required'
        }
        
        if (!formData.passengerName.trim()) {
            newErrors.passengerName = 'Passenger name is required'
        }
        
        if (!formData.passengerId.trim()) {
            newErrors.passengerId = 'Passenger ID is required'
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
            flightBookingId: data.flightBookingId ? Number(data.flightBookingId) : undefined,
            bookingId: data.bookingId ? Number(data.bookingId) : undefined,
            flightId: data.flightId ? Number(data.flightId) : undefined,
            // Keep passengerId as string as it might contain non-numeric characters
            passengerId: data.passengerId.trim()
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
                            Edit Flight Booking
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
                                    htmlFor="flightId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Flight ID
                                </label>
                                <input
                                    type="text"
                                    name="flightId"
                                    id="flightId"
                                    value={formData.flightId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.flightId ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                />
                                {errors.flightId && (
                                    <p className="mt-1 text-sm text-red-500">{errors.flightId}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="seatClass"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Seat Class
                                </label>
                                <select
                                    name="seatClass"
                                    id="seatClass"
                                    value={formData.seatClass}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.seatClass ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                >
                                    <option value="">Select class</option>
                                    <option value="Economy">Economy</option>
                                    <option value="Business">Business</option>
                                    <option value="First">First</option>
                                </select>
                                {errors.seatClass && (
                                    <p className="mt-1 text-sm text-red-500">{errors.seatClass}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="passengerName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Passenger Name
                                </label>
                                <input
                                    type="text"
                                    name="passengerName"
                                    id="passengerName"
                                    value={formData.passengerName}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.passengerName ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                />
                                {errors.passengerName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.passengerName}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="passengerId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Passenger ID
                                </label>
                                <input
                                    type="text"
                                    name="passengerId"
                                    id="passengerId"
                                    value={formData.passengerId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.passengerId ? 'border-red-500' : 'border-gray-300'
                                    } px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm`}
                                />
                                {errors.passengerId && (
                                    <p className="mt-1 text-sm text-red-500">{errors.passengerId}</p>
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

EditFlightModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    flightData: PropTypes.shape({
        flightBookingId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        flightId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        seatClass: PropTypes.string,
        passengerName: PropTypes.string,
        passengerId: PropTypes.string
    })
}

EditFlightModal.defaultProps = {
    flightData: null
}

export default EditFlightModal