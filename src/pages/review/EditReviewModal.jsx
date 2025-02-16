import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const EditReviewModal = ({ isOpen, onClose, onSave, reviewData }) => {
    const [formData, setFormData] = useState({
        reviewId: '',
        userId: '',
        itemType: '',
        itemId: '',
        rating: '',
        comment: '',
        reply: ''
    })

    useEffect(() => {
        if (reviewData) {
            setFormData(reviewData)
        }
    }, [reviewData])

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
                            Edit Review
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
                                    htmlFor="itemType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Item Type
                                </label>
                                <select
                                    name="itemType"
                                    id="itemType"
                                    value={formData.itemType}
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
                                    htmlFor="rating"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Rating
                                </label>
                                <select
                                    name="rating"
                                    id="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                >
                                    <option value="">Select rating</option>
                                    {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(
                                        (rating) => (
                                            <option key={rating} value={rating}>
                                                {rating}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="comment"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Comment
                                </label>
                                <textarea
                                    name="comment"
                                    id="comment"
                                    rows={3}
                                    value={formData.comment}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="reply"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Reply
                                </label>
                                <textarea
                                    name="reply"
                                    id="reply"
                                    rows={3}
                                    value={formData.reply}
                                    onChange={handleChange}
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

EditReviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    reviewData: PropTypes.shape({
        reviewId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        itemType: PropTypes.string,
        itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        comment: PropTypes.string,
        reply: PropTypes.string
    })
}

EditReviewModal.defaultProps = {
    reviewData: null
}

export default EditReviewModal
