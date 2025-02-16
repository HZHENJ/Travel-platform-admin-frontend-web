import { Card } from '@/components/ui/card'
import PropTypes from 'prop-types'

const TrendingPlaces = ({ attractions }) => {
    const { places, visits } = attractions
    const maxVisits = Math.max(...visits)

    return (
        <Card className="p-6">
            <div className="mb-6 flex items-center gap-2">
                <h3 className="text-lg font-medium">Trending Places</h3>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {places.map((place, index) => (
                    <Card
                        key={index}
                        className={`border p-4 ${index === 0 ? 'border-teal-200 bg-teal-50' : 'border-gray-200'}`}
                    >
                        <div className="space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4
                                        className="truncate font-medium"
                                        title={place}
                                    >
                                        {place}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {visits[index]} bookings
                                    </p>
                                </div>
                                {index === 0 && (
                                    <span className="rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-700">
                                        Top
                                    </span>
                                )}
                            </div>
                            <div
                                className={`h-1.5 w-full rounded-full ${index === 0 ? 'bg-teal-100' : 'bg-gray-100'}`}
                            >
                                <div
                                    className={`h-full rounded-full transition-all ${
                                        index === 0
                                            ? 'bg-teal-600'
                                            : index === 1
                                              ? 'bg-teal-500'
                                              : 'bg-teal-400'
                                    }`}
                                    style={{
                                        width: `${(visits[index] / maxVisits) * 100}%`
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Card>
    )
}

TrendingPlaces.propTypes = {
    attractions: PropTypes.shape({
        places: PropTypes.arrayOf(PropTypes.string).isRequired,
        visits: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired
}

TrendingPlaces.defaultProps = {
    attractions: {
        places: [],
        visits: []
    }
}

export default TrendingPlaces
