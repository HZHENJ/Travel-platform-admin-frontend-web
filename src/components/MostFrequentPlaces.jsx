import PropTypes from 'prop-types'
import { Card } from '@/components/ui/card'
import BarChart from '@/components/charts/BarChart'

const MostFrequentPlaces = ({ data }) => {
    const defaultData = {
        places: [
            'Marina Bay Sands',
            'Gardens by the Bay',
            'Sentosa',
            'Universal Studios',
            'Singapore Zoo'
        ],
        visits: [540, 470, 448, 430, 400]
    }

    const placeData = data || defaultData

    return (
        <Card className="p-6">
            <BarChart
                title="Most Frequent Places"
                data={placeData.visits}
                categories={placeData.places}
                horizontal={true}
                colors={['#14b8a6']}
            />
        </Card>
    )
}

MostFrequentPlaces.propTypes = {
    data: PropTypes.shape({
        places: PropTypes.arrayOf(PropTypes.string).isRequired,
        visits: PropTypes.arrayOf(PropTypes.number).isRequired
    })
}

export default MostFrequentPlaces
