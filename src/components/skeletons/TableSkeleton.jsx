import PropTypes from 'prop-types'
import { Card } from '@/components/ui/card'

const TableSkeleton = ({ columns = 6, rows = 5 }) => {
    const Skeleton = ({ className }) => (
        <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
    )

    Skeleton.propTypes = {
        className: PropTypes.string.isRequired
    }

    return (
        <Card className="mt-8">
            <div className="overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ring-1 ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                {/* Table Header */}
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[...Array(columns)].map((_, index) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="px-3 py-3.5"
                                            >
                                                <Skeleton className="h-4 w-24" />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {[...Array(rows)].map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {[...Array(columns)].map(
                                                (_, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        className="px-3 py-4 whitespace-nowrap"
                                                    >
                                                        <Skeleton className="h-4 w-full max-w-[120px]" />
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

TableSkeleton.propTypes = {
    columns: PropTypes.number,
    rows: PropTypes.number
}

export default TableSkeleton
