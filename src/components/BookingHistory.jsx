import { Card } from '@/components/ui/card'

const BookingHistory = () => {
    return (
        <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">Booking History</h3>
            <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Booking #{item}
                                </p>
                                <p className="text-xs text-gray-500">
                                    2 hours ago
                                </p>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-teal-600">
                            $299
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default BookingHistory
