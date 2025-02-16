import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import Table from '@/components/ui/Table'
import { useAttraction } from '@/hooks/useAttraction'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import EditAttractionModal from './EditAttractionModal'
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

// Attraction booking table columns
const attractionBookingColumns = [
    { key: 'attractionBookingId', label: 'ID' },
    { key: 'bookingId', label: 'Booking ID' },
    { key: 'attractionId', label: 'Attraction ID' },
    { key: 'visitDate', label: 'Visit Date', type: 'date' },
    {
        key: 'ticketType',
        label: 'Ticket Type',
        type: 'select',
        options: [
            { value: 'Adult', label: 'Adult' },
            { value: 'Child', label: 'Child' },
            { value: 'Senior', label: 'Senior' }
        ]
    },
    { key: 'numberOfTickets', label: 'Number of Tickets' }
]

// CSV headers
const csvColumns = attractionBookingColumns.map((col) => ({
    key: col.key,
    label: col.label
}))

const transformDataForCSV = (attractionBookings) => {
    return attractionBookings.map((booking) => ({
        attractionBookingId: booking.attractionBookingId,
        bookingId: booking.bookingId,
        attractionId: booking.attractionId,
        visitDate: booking.visitDate,
        ticketType: booking.ticketType,
        numberOfTickets: booking.numberOfTickets
    }))
}

const Attraction = () => {
    const {
        attractionBookings,
        isLoading,
        error,
        deleteAttractionBooking,
        editAttractionBooking
    } = useAttraction()
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedAttraction, setSelectedAttraction] = useState(null)

    const handleDelete = async (item) => {
        try {
            await deleteAttractionBooking(item.attractionBookingId)
        } catch (error) {
            console.error('Delete operation failed:', error)
        }
    }

    const handleEdit = (item) => {
        setSelectedAttraction(item)
        setEditModalOpen(true)
    }

    const handleSave = async (updatedData) => {
        try {
            await editAttractionBooking(
                updatedData.attractionBookingId,
                updatedData
            )
            setEditModalOpen(false)
            setSelectedAttraction(null)
        } catch (error) {
            console.error('Update operation failed:', error)
        }
    }

    const exportToWord = async () => {
        const rows = attractionBookings.map(
            (booking) =>
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph(
                                    booking.attractionBookingId.toString()
                                )
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(booking.bookingId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(booking.attractionId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [new Paragraph(booking.visitDate)]
                        }),
                        new TableCell({
                            children: [new Paragraph(booking.ticketType)]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(
                                    booking.numberOfTickets.toString()
                                )
                            ]
                        })
                    ]
                })
        )

        const table = new DocTable({
            rows: [
                new TableRow({
                    children: attractionBookingColumns.map(
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
                        new Paragraph('Attraction Bookings Report'),
                        new Paragraph(' '),
                        table
                    ]
                }
            ]
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, 'attraction_bookings.docx')
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
                        Attraction Bookings
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the attraction bookings.
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
                        data={transformDataForCSV(attractionBookings)}
                        headers={csvColumns}
                        filename="attraction_bookings.csv"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Export to CSV
                    </CSVLink>
                </div>
            </div>
            {isLoading ? (
                <TableSkeleton
                    columns={attractionBookingColumns.length}
                    rows={5}
                />
            ) : (
                <Table
                    data={attractionBookings}
                    columns={attractionBookingColumns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            )}
            <EditAttractionModal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false)
                    setSelectedAttraction(null)
                }}
                onSave={handleSave}
                attractionData={selectedAttraction}
            />
        </div>
    )
}

export default Attraction
