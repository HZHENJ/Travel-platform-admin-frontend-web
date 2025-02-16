import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const ReplyReviewModal = ({ isOpen, onClose, onSave, reviewData }) => {
    const [reply, setReply] = useState('')

    useEffect(() => {
        if (reviewData) {
            setReply(reviewData.reply || '')
        }
    }, [reviewData])

    const handleSubmit = (e) => {
        e.preventDefault()
        // Just pass the reply text instead of the whole object
        onSave(reply)
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-white">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            Reply to Review
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
                            {/* Original Review Display */}
                            <div className="rounded-md bg-gray-50 p-4">
                                <div className="text-sm text-gray-500">
                                    Original Review:
                                </div>
                                <div className="mt-1 text-sm text-gray-900">
                                    {reviewData?.comment}
                                </div>
                            </div>

                            {/* Reply Input */}
                            <div>
                                <label
                                    htmlFor="reply"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Your Reply
                                </label>
                                <textarea
                                    name="reply"
                                    id="reply"
                                    rows={4}
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type your reply here..."
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 focus:outline-none sm:text-sm"
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
                                Submit Reply
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

ReplyReviewModal.propTypes = {
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

ReplyReviewModal.defaultProps = {
    reviewData: null
}

export default ReplyReviewModal
