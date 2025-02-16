import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const AreaChart = ({ data, title, categories }) => {
    const options = {
        chart: {
            type: 'area',
            toolbar: { show: false }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: { categories },
        colors: ['#14b8a6'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        }
    }

    const series = [
        {
            name: 'Bookings',
            data
        }
    ]

    return (
        <div>
            <h3 className="mb-4 text-lg font-medium">{title}</h3>
            <Chart options={options} series={series} type="area" height={200} />
        </div>
    )
}

AreaChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default AreaChart
