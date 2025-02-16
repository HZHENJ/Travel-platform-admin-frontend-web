import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import Table from '@/components/ui/Table'
import { useFlight } from '@/hooks/useFlight'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import EditFlightModal from './EditFlightModal'
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

// Flight booking table columns
const flightBookingColumns = [
    { key: 'flightBookingId', label: 'ID' },
    { key: 'bookingId', label: 'Booking ID' },
    { key: 'flightId', label: 'Flight ID' },
    {
        key: 'seatClass',
        label: 'Seat Class',
        type: 'select',
        options: [
            { value: 'Business', label: 'Business' },
            { value: 'Economy', label: 'Economy' },
            { value: 'First', label: 'First' }
        ]
    },
    { key: 'passengerName', label: 'Passenger Name' },
    { key: 'passengerId', label: 'Passenger ID' }
]

// CSV headers
const csvColumns = flightBookingColumns.map((col) => ({
    key: col.key,
    label: col.label
}))

const transformDataForCSV = (flightBookings) => {
    return flightBookings.map((flight) => ({
        flightBookingId: flight.flightBookingId,
        bookingId: flight.bookingId,
        flightId: flight.flightId,
        seatClass: flight.seatClass,
        passengerName: flight.passengerName,
        passengerId: flight.passengerId
    }))
}

const Flight = () => {
    const {
        flightBookings,
        isLoading,
        error,
        deleteFlightBooking,
        editFlightBooking
    } = useFlight()
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedFlight, setSelectedFlight] = useState(null)

    const handleDelete = async (item) => {
        try {
            await deleteFlightBooking(item.flightBookingId)
        } catch (error) {
            console.error('Delete operation failed:', error)
        }
    }

    const handleEdit = (item) => {
        setSelectedFlight(item)
        setEditModalOpen(true)
    }

    const handleSave = async (updatedData) => {
        try {
            await editFlightBooking(updatedData.flightBookingId, updatedData)
            setEditModalOpen(false)
            setSelectedFlight(null)
        } catch (error) {
            console.error('Update operation failed:', error)
        }
    }

    const exportToWord = async () => {
        const rows = flightBookings.map(
            (flight) =>
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph(flight.flightBookingId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(flight.bookingId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(flight.flightId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [new Paragraph(flight.seatClass)]
                        }),
                        new TableCell({
                            children: [new Paragraph(flight.passengerName)]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(flight.passengerId.toString())
                            ]
                        })
                    ]
                })
        )

        const table = new DocTable({
            rows: [
                new TableRow({
                    children: flightBookingColumns.map(
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
                        new Paragraph('Flight Bookings Report'),
                        new Paragraph(' '),
                        table
                    ]
                }
            ]
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, 'flight_bookings.docx')
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
                        Flight Bookings
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the flight bookings.
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
                        data={transformDataForCSV(flightBookings)}
                        headers={csvColumns}
                        filename="flight_bookings.csv"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Export to CSV
                    </CSVLink>
                </div>
            </div>
            {isLoading ? (
                <TableSkeleton columns={flightBookingColumns.length} rows={5} />
            ) : (
                <Table
                    data={flightBookings}
                    columns={flightBookingColumns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            )}
            <EditFlightModal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false)
                    setSelectedFlight(null)
                }}
                onSave={handleSave}
                flightData={selectedFlight}
            />
        </div>
    )
}

export default Flight
