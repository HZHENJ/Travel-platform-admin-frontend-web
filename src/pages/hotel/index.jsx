import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import Table from '@/components/ui/Table'
import { useHotel } from '@/hooks/useHotel'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import EditHotelModal from './EditHotelModal'
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

// Hotel booking table columns
const hotelBookingColumns = [
    { key: 'hotelBookingId', label: 'ID' },
    { key: 'bookingId', label: 'Booking ID' },
    { key: 'hotelId', label: 'Hotel ID' },
    { key: 'checkInDate', label: 'Check-in Date', type: 'date' },
    { key: 'checkOutDate', label: 'Check-out Date', type: 'date' },
    {
        key: 'roomType',
        label: 'Room Type',
        type: 'select',
        options: [
            { value: 'Standard', label: 'Standard' },
            { value: 'Deluxe', label: 'Deluxe' },
            { value: 'Suite', label: 'Suite' }
        ]
    },
    { key: 'location', label: 'Location' },
    { key: 'guests', label: 'Guests' }
]

// CSV headers
const csvColumns = hotelBookingColumns.map((col) => ({
    key: col.key,
    label: col.label
}))

const transformDataForCSV = (hotelBookings) => {
    return hotelBookings.map((hotel) => ({
        hotelBookingId: hotel.hotelBookingId,
        bookingId: hotel.bookingId,
        hotelId: hotel.hotelId,
        checkInDate: hotel.checkInDate,
        checkOutDate: hotel.checkOutDate,
        roomType: hotel.roomType,
        location: hotel.location,
        guests: hotel.guests
    }))
}

const Hotel = () => {
    const {
        hotelBookings,
        isLoading,
        error,
        deleteHotelBooking,
        editHotelBooking
    } = useHotel()
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedHotel, setSelectedHotel] = useState(null)

    const handleDelete = async (item) => {
        try {
            await deleteHotelBooking(item.hotelBookingId)
        } catch (error) {
            console.error('Delete operation failed:', error)
        }
    }

    const handleEdit = (item) => {
        setSelectedHotel(item)
        setEditModalOpen(true)
    }

    const handleSave = async (updatedData) => {
        try {
            await editHotelBooking(updatedData.hotelBookingId, updatedData)
            setEditModalOpen(false)
            setSelectedHotel(null)
        } catch (error) {
            console.error('Update operation failed:', error)
        }
    }

    const exportToWord = async () => {
        const rows = hotelBookings.map(
            (hotel) =>
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph(hotel.hotelBookingId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(hotel.bookingId.toString())
                            ]
                        }),
                        new TableCell({
                            children: [new Paragraph(hotel.hotelId.toString())]
                        }),
                        new TableCell({
                            children: [new Paragraph(hotel.checkInDate)]
                        }),
                        new TableCell({
                            children: [new Paragraph(hotel.checkOutDate)]
                        }),
                        new TableCell({
                            children: [new Paragraph(hotel.roomType)]
                        }),
                        new TableCell({
                            children: [new Paragraph(hotel.location)]
                        }),
                        new TableCell({
                            children: [new Paragraph(hotel.guests.toString())]
                        })
                    ]
                })
        )

        const table = new DocTable({
            rows: [
                new TableRow({
                    children: hotelBookingColumns.map(
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
                        new Paragraph('Hotel Bookings Report'),
                        new Paragraph(' '),
                        table
                    ]
                }
            ]
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, 'hotel_bookings.docx')
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
                        Hotel Bookings
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the hotel bookings.
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
                        data={transformDataForCSV(hotelBookings)}
                        headers={csvColumns}
                        filename="hotel_bookings.csv"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Export to CSV
                    </CSVLink>
                </div>
            </div>
            {isLoading ? (
                <TableSkeleton columns={hotelBookingColumns.length} rows={5} />
            ) : (
                <Table
                    data={hotelBookings}
                    columns={hotelBookingColumns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            )}
            <EditHotelModal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false)
                    setSelectedHotel(null)
                }}
                onSave={handleSave}
                hotelData={selectedHotel}
            />
        </div>
    )
}

export default Hotel
