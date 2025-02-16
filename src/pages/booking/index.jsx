import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import Table from '@/components/ui/Table'
import { useBooking } from '@/hooks/useBooking'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import EditBookingModal from './EditBookingModal'
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

// Booking table columns
const bookingColumns = [
    { key: 'bookingId', label: 'Booking ID' },
    { key: 'userId', label: 'User ID' },
    {
        key: 'bookingType',
        label: 'Type',
        type: 'select',
        options: [
            { value: 'Flight', label: 'Flight' },
            { value: 'Hotel', label: 'Hotel' },
            { value: 'Attraction', label: 'Attraction' }
        ]
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'Confirmed', label: 'Confirmed' },
            { value: 'Canceled', label: 'Canceled' },
            { value: 'Pending', label: 'Pending' }
        ]
    },
    { key: 'totalAmount', label: 'Total Amount' },
    { key: 'displayCreatedAt', label: 'Created At', type: 'date' },
    { key: 'displayUpdatedAt', label: 'Updated At', type: 'date' }
]

// CSV headers
const csvColumns = bookingColumns.map((col) => ({
    key: col.key,
    label: col.label
}))

const transformDataForCSV = (bookings) => {
    return bookings.map((booking) => ({
        bookingId: booking.bookingId,
        userId: booking.userId,
        bookingType: booking.bookingType,
        status: booking.status,
        totalAmount: booking.totalAmount,
        displayCreatedAt: booking.displayCreatedAt,
        displayUpdatedAt: booking.displayUpdatedAt
    }))
}

const Booking = () => {
    const { bookings, isLoading, error, deleteBooking, editBooking } =
        useBooking()
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)

    const handleDelete = async (item) => {
        try {
            await deleteBooking(item.bookingId)
        } catch (error) {
            console.error('Delete operation failed:', error)
        }
    }

    const handleEdit = (item) => {
        setSelectedBooking(item)
        setEditModalOpen(true)
    }

    const handleSave = async (updatedData) => {
        try {
            await editBooking(updatedData.bookingId, updatedData)
            setEditModalOpen(false)
            setSelectedBooking(null)
        } catch (error) {
            console.error('Update operation failed:', error)
        }
    }

    const exportToWord = async () => {
        const rows = bookings.map(
            (booking) =>
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph(booking.bookingId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [new Paragraph(booking.userId.toString())]
                        }),
                        new TableCell({
                            children: [new Paragraph(booking.bookingType)]
                        }),
                        new TableCell({
                            children: [new Paragraph(booking.status)]
                        }),
                        new TableCell({
                            children: [new Paragraph(`$${booking.totalAmount}`)]
                        }),
                        new TableCell({
                            children: [new Paragraph(booking.displayCreatedAt)]
                        }),
                        new TableCell({
                            children: [new Paragraph(booking.displayUpdatedAt)]
                        })
                    ]
                })
        )

        const table = new DocTable({
            rows: [
                new TableRow({
                    children: bookingColumns.map(
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
                        new Paragraph('Bookings Report'),
                        new Paragraph(' '),
                        table
                    ]
                }
            ]
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, 'bookings.docx')
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
                        Bookings
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the bookings.
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
                        data={transformDataForCSV(bookings)}
                        headers={csvColumns}
                        filename="bookings.csv"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Export to CSV
                    </CSVLink>
                </div>
            </div>
            {isLoading ? (
                <TableSkeleton columns={bookingColumns.length} rows={5} />
            ) : (
                <Table
                    data={bookings}
                    columns={bookingColumns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            )}
            <EditBookingModal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false)
                    setSelectedBooking(null)
                }}
                onSave={handleSave}
                bookingData={selectedBooking}
            />
        </div>
    )
}

export default Booking
