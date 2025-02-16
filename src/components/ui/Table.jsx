import { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu } from '@headlessui/react'
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    FunnelIcon
} from '@heroicons/react/20/solid'
import {
    EllipsisVerticalIcon,
    PencilIcon,
    TrashIcon,
    CalendarIcon,
    ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'
import Modal from './Modal'
import { formatDate } from '@/utilities/formatDate'

const Table = ({ data, columns, onDelete, onEdit, onReply }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [deleteModal, setDeleteModal] = useState({ open: false, item: null })
    const [filters, setFilters] = useState({})
    const [showFilters, setShowFilters] = useState(false)

    const pageSizeOptions = [10, 25, 50, 100]

    // Function to check if we're on the review page
    const isReviewPage = () => {
        return window.location.pathname.includes('/reviews')
    }

    const formattedData = data.map((item) => {
        const newItem = { ...item }
        columns.forEach((column) => {
            if (column.type === 'date' && newItem[column.key]) {
                try {
                    newItem[column.key] = formatDate(newItem[column.key])
                } catch (error) {
                    console.error('Error formatting date:', error)
                }
            }
        })
        return newItem
    })

    // Filter the data based on current filters
    const filteredData = formattedData.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true
            const itemValue = String(item[key]).toLowerCase()
            return itemValue.includes(String(value).toLowerCase())
        })
    })

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value)
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1)
    }

    const handleFilterChange = (e, key, type = 'text') => {
        let value = e.target.value

        if (type === 'date' && value) {
            // Convert YYYY-MM-DD to DD-MM-YYYY for filter storage
            const [year, month, day] = value.split('-')
            value = `${day}-${month}-${year}`
        }

        setFilters((prev) => ({
            ...prev,
            [key]: value
        }))
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setFilters({})
        setCurrentPage(1)
    }

    const handleDeleteClick = (item) => {
        setDeleteModal({ open: true, item })
    }

    const handleDeleteConfirm = async () => {
        if (deleteModal.item && onDelete) {
            await onDelete(deleteModal.item)
        }
        setDeleteModal({ open: false, item: null })
    }

    const handleEditClick = (item) => {
        if (onEdit) {
            onEdit(item)
        }
    }

    const handleReplyClick = (item) => {
        if (onReply) {
            onReply(item)
        }
    }

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''
        // Convert DD-MM-YYYY to YYYY-MM-DD for input element
        const [day, month, year] = dateString.split('-')
        return `${year}-${month}-${day}`
    }

    const renderFilterInputs = () => {
        return (
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {columns.map((column) => {
                    if (column.key === 'actions') return null

                    // Special handling for date inputs
                    if (column.type === 'date') {
                        return (
                            <div key={column.key} className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">
                                    {column.label}
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={
                                            filters[column.key]
                                                ? formatDateForInput(
                                                      filters[column.key]
                                                  )
                                                : ''
                                        }
                                        onChange={(e) =>
                                            handleFilterChange(
                                                e,
                                                column.key,
                                                'date'
                                            )
                                        }
                                        className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                    />
                                    <CalendarIcon className="absolute top-2 left-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        )
                    }

                    // Special handling for select inputs
                    if (column.type === 'select' && column.options) {
                        return (
                            <div key={column.key} className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">
                                    {column.label}
                                </label>
                                <select
                                    value={filters[column.key] || ''}
                                    onChange={(e) =>
                                        handleFilterChange(e, column.key)
                                    }
                                    className="block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                >
                                    <option value="">All</option>
                                    {column.options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )
                    }

                    // Default text input
                    return (
                        <div key={column.key} className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700">
                                {column.label}
                            </label>
                            <input
                                type="text"
                                value={filters[column.key] || ''}
                                onChange={(e) =>
                                    handleFilterChange(e, column.key)
                                }
                                placeholder={`Filter by ${column.label.toLowerCase()}`}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            <div className="mt-8 space-y-4">
                {/* Filter toggle button */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                        <FunnelIcon className="h-5 w-5 text-gray-400" />
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    {showFilters && (
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset hover:bg-gray-50"
                        >
                            <XMarkIcon className="h-5 w-5 text-gray-400" />
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Filter inputs */}
                {showFilters && renderFilterInputs()}

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {columns.map((column) => (
                                                <th
                                                    key={column.key}
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    {column.label}
                                                </th>
                                            ))}
                                            <th
                                                scope="col"
                                                className="relative py-3.5 pr-4 pl-3 sm:pr-6"
                                            >
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {currentData.map((item, index) => (
                                            <tr key={index}>
                                                {columns.map((column) => (
                                                    <td
                                                        key={column.key}
                                                        className="px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                                    >
                                                        {item[column.key]}
                                                    </td>
                                                ))}
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    <Menu
                                                        as="div"
                                                        className="relative inline-block text-left"
                                                    >
                                                        <Menu.Button className="rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none">
                                                            <EllipsisVerticalIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </Menu.Button>

                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none">
                                                            <div className="py-1">
                                                                {isReviewPage() ? (
                                                                    <Menu.Item>
                                                                        {({
                                                                            active
                                                                        }) => (
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleReplyClick(
                                                                                        item
                                                                                    )
                                                                                }
                                                                                className={`${
                                                                                    active
                                                                                        ? 'bg-gray-100 text-gray-900'
                                                                                        : 'text-gray-700'
                                                                                } flex w-full px-4 py-2 text-sm`}
                                                                            >
                                                                                <ChatBubbleLeftIcon
                                                                                    className="mr-3 h-5 w-5 text-gray-400"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                Reply
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                ) : (
                                                                    <>
                                                                        <Menu.Item>
                                                                            {({
                                                                                active
                                                                            }) => (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleEditClick(
                                                                                            item
                                                                                        )
                                                                                    }
                                                                                    className={`${
                                                                                        active
                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                            : 'text-gray-700'
                                                                                    } flex w-full px-4 py-2 text-sm`}
                                                                                >
                                                                                    <PencilIcon
                                                                                        className="mr-3 h-5 w-5 text-gray-400"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                    Edit
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            {({
                                                                                active
                                                                            }) => (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleDeleteClick(
                                                                                            item
                                                                                        )
                                                                                    }
                                                                                    className={`${
                                                                                        active
                                                                                            ? 'bg-red-50 text-red-900'
                                                                                            : 'text-red-700'
                                                                                    } flex w-full px-4 py-2 text-sm`}
                                                                                >
                                                                                    <TrashIcon
                                                                                        className="mr-3 h-5 w-5 text-red-400"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                    Delete
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </Menu.Items>
                                                    </Menu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-700">
                            Results per page
                        </span>
                        <div className="relative">
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="h-8 w-24 appearance-none rounded-md bg-white py-0 pr-8 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600"
                            >
                                {pageSizeOptions.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        </div>

                        <p className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">
                                {startIndex + 1}
                            </span>{' '}
                            to{' '}
                            <span className="font-medium">
                                {Math.min(endIndex, filteredData.length)}
                            </span>{' '}
                            of{' '}
                            <span className="font-medium">
                                {filteredData.length}
                            </span>{' '}
                            results
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-700">
                            Page{' '}
                            <span className="font-medium">{currentPage}</span>{' '}
                            of <span className="font-medium">{totalPages}</span>
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:ring-2 focus:ring-teal-600 focus:outline-none disabled:opacity-50"
                            >
                                <ChevronLeftIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                                Previous
                            </button>

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:ring-2 focus:ring-teal-600 focus:outline-none disabled:opacity-50"
                            >
                                Next
                                <ChevronRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, item: null })}
                type="danger"
                title="Delete Record"
                description={
                    <div>
                        Are you sure you want to delete this record? This action
                        cannot be undone.
                    </div>
                }
                confirmText="Delete"
                onConfirm={handleDeleteConfirm}
            />
        </>
    )
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'date', 'select']),
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired
                })
            )
        })
    ).isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onReply: PropTypes.func
}

export default Table
