import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import Table from '@/components/ui/Table'
import { useReview } from '@/hooks/useReview'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import EditReviewModal from './EditReviewModal'
import ReplyReviewModal from './ReplyReviewModal'
import { CSVLink } from 'react-csv'
import { saveAs } from 'file-saver'
import {
    Document,
    Packer,
    Paragraph,
    Table as DocTable,
    TableRow,
    TableCell
} from 'docx'

// Review table columns
const reviewColumns = [
    { key: 'reviewId', label: 'ID' },
    { key: 'userId', label: 'User ID' },
    {
        key: 'itemType',
        label: 'Item Type',
        type: 'select',
        options: [
            { value: 'Flight', label: 'Flight' },
            { value: 'Hotel', label: 'Hotel' },
            { value: 'Attraction', label: 'Attraction' }
        ]
    },
    { key: 'itemId', label: 'Item ID' },
    {
        key: 'rating',
        label: 'Rating',
        type: 'select',
        options: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => ({
            value: rating.toString(),
            label: rating.toString()
        }))
    },
    { key: 'comment', label: 'Comment' },
    { key: 'reply', label: 'Reply' }
]

// CSV headers
const csvColumns = reviewColumns.map((col) => ({
    key: col.key,
    label: col.label
}))

const transformDataForCSV = (reviews) => {
    return reviews.map((review) => ({
        reviewId: review.reviewId,
        userId: review.userId,
        itemType: review.itemType,
        itemId: review.itemId,
        rating: review.rating,
        comment: review.comment,
        reply: review.reply || 'No Reply'
    }))
}

const Review = () => {
    const { reviews, isLoading, error, deleteReview, editReview, addReply } =
        useReview()
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [replyModalOpen, setReplyModalOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null)

    const handleDelete = async (item) => {
        try {
            await deleteReview(item.reviewId)
        } catch (error) {
            console.error('Delete operation failed:', error)
        }
    }

    const handleEdit = (item) => {
        setSelectedReview(item)
        setEditModalOpen(true)
    }

    const handleReply = (item) => {
        setSelectedReview(item)
        setReplyModalOpen(true)
    }

    const handleSave = async (updatedData) => {
        try {
            await editReview(updatedData.reviewId, updatedData)
            setEditModalOpen(false)
            setSelectedReview(null)
        } catch (error) {
            console.error('Update operation failed:', error)
        }
    }

    const handleReplySave = async (replyText) => {
        try {
            if (!selectedReview) return
            await addReply(selectedReview.reviewId, replyText)
            setReplyModalOpen(false)
            setSelectedReview(null)
        } catch (error) {
            console.error('Reply save failed:', error)
        }
    }

    const exportToWord = async () => {
        const rows = reviews.map(
            (review) =>
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph(review.reviewId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [new Paragraph(review.userId.toString())]
                        }),
                        new TableCell({
                            children: [new Paragraph(review.itemType)]
                        }),
                        new TableCell({
                            children: [new Paragraph(review.itemId.toString())]
                        }),
                        new TableCell({
                            children: [new Paragraph(review.rating.toString())]
                        }),
                        new TableCell({
                            children: [new Paragraph(review.comment)]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(review.reply || 'No Reply')
                            ]
                        })
                    ]
                })
        )

        const table = new DocTable({
            rows: [
                new TableRow({
                    children: reviewColumns.map(
                        (col) =>
                            new TableCell({
                                children: [new Paragraph(col.label)]
                            })
                    )
                }),
                ...rows
            ]
        })

        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph('Review Report'),
                        new Paragraph(' '),
                        table
                    ]
                }
            ]
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, 'reviews.docx')
    }

    if (error) {
        return (
            <div className="px-4 sm:px-6 lg:px-8">
                <Alert message={error} />
            </div>
        )
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="justify-between sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base leading-6 font-semibold text-gray-900">
                        Reviews
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all reviews and feedback.
                    </p>
                </div>
                <div className="mt-4 flex gap-4 sm:mt-0 sm:ml-16">
                    <button
                        onClick={exportToWord}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Export to Word
                    </button>
                    <CSVLink
                        data={transformDataForCSV(reviews)}
                        headers={csvColumns}
                        filename="reviews.csv"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Export to CSV
                    </CSVLink>
                </div>
            </div>
            {isLoading ? (
                <TableSkeleton columns={reviewColumns.length} rows={5} />
            ) : (
                <Table
                    data={reviews}
                    columns={reviewColumns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onReply={handleReply}
                />
            )}

            <EditReviewModal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false)
                    setSelectedReview(null)
                }}
                onSave={handleSave}
                reviewData={selectedReview}
            />

            <ReplyReviewModal
                isOpen={replyModalOpen}
                onClose={() => {
                    setReplyModalOpen(false)
                    setSelectedReview(null)
                }}
                onSave={handleReplySave}
                reviewData={selectedReview}
            />
        </div>
    )
}

export default Review
