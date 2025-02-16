import PropTypes from 'prop-types'
import { Card } from '@/components/ui/card'

const DashboardSkeleton = () => {
    const Skeleton = ({ className }) => (
        <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
    )

    // Add PropTypes for the inner Skeleton component
    Skeleton.propTypes = {
        className: PropTypes.string.isRequired
    }

    return (
        <div className="space-y-6">
            {/* Top row */}
            <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="col-span-1 p-6">
                        <Skeleton className="mb-4 h-6 w-48" />
                        <Skeleton className="h-[200px] w-full" />
                    </Card>
                ))}
            </div>

            {/* Middle section */}
            <Card className="p-6">
                <Skeleton className="mb-4 h-6 w-64" />
                <Skeleton className="h-48 w-full" />
            </Card>

            {/* Bottom row */}
            <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="p-6">
                        <Skeleton className="mb-4 h-6 w-40" />
                        <Skeleton className="h-[300px] w-full" />
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DashboardSkeleton
