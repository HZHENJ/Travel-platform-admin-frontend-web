import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const EditBookingModal = ({ isOpen, onClose, onSave, bookingData }) => {
    const [formData, setFormData] = useState({
        bookingId: '',
        userId: '',
        bookingType: '',
        status: '',
        totalAmount: '',
        createdAt: '',
        updatedAt: ''
    })

    useEffect(() => {
        if (bookingData) {
            setFormData(bookingData)
        }
    }, [bookingData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-white">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            Edit Booking
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
                                    htmlFor="userId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    User ID
                                </label>
                                <input
                                    type="text"
                                    name="userId"
                                    id="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="bookingType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Booking Type
                                </label>
                                <select
                                    name="bookingType"
                                    id="bookingType"
                                    value={formData.bookingType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                >
                                    <option value="">Select type</option>
                                    <option value="Flight">Flight</option>
                                    <option value="Hotel">Hotel</option>
                                    <option value="Attraction">
                                        Attraction
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Status
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                >
                                    <option value="">Select status</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Canceled">Canceled</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="totalAmount"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Total Amount
                                </label>
                                <input
                                    type="number"
                                    name="totalAmount"
                                    id="totalAmount"
                                    value={formData.totalAmount}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
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

EditBookingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    bookingData: PropTypes.shape({
        bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bookingType: PropTypes.string,
        status: PropTypes.string,
        totalAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string
    })
}

EditBookingModal.defaultProps = {
    bookingData: null
}

export default EditBookingModal
