import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const BarChart = ({
    data,
    title,
    categories,
    horizontal = false,
    colors = ['#14b8a6'],
    legend = false
}) => {
    const options = {
        chart: {
            type: 'bar',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal,
                columnWidth: '55%',
                borderRadius: horizontal ? 4 : 2
            }
        },
        xaxis: { categories },
        colors,
        legend: {
            show: legend,
            horizontalAlign: 'right',
            position: 'top',
            fontSize: '14px',
            fontFamily: 'inherit',
            offsetY: -8
        }
    }

    const series =
        Array.isArray(data[0]) || typeof data[0] === 'object'
            ? data.map((series) => ({
                  name: series.name,
                  data: series.data
              }))
            : [{ data }]

    return (
        <div>
            <h3 className="mb-4 text-lg font-medium">{title}</h3>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={horizontal ? 300 : 200}
            />
        </div>
    )
}

BarChart.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                data: PropTypes.arrayOf(PropTypes.number).isRequired
            })
        )
    ]).isRequired,
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    horizontal: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
    legend: PropTypes.bool
}

BarChart.defaultProps = {
    horizontal: false,
    colors: ['#14b8a6'],
    legend: false
}

export default BarChart
