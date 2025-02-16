import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const PieChart = ({
    data,
    labels,
    title,
    type = 'donut',
    colors = ['#14b8a6', '#0d9488']
}) => {
    const options = {
        chart: {
            type
        },
        labels,
        colors,
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            fontFamily: 'inherit',
            offsetY: 8,
            markers: {
                width: 12,
                height: 12,
                radius: 12
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5
            },
            formatter: function (seriesName, opts) {
                return [
                    seriesName,
                    ' - ',
                    opts.w.globals.series[opts.seriesIndex],
                    ' (',
                    (
                        (opts.w.globals.series[opts.seriesIndex] /
                            opts.w.globals.series.reduce((a, b) => a + b)) *
                        100
                    ).toFixed(1),
                    '%)'
                ].join('')
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '16px',
                            fontFamily: 'inherit',
                            color: '#374151'
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + '%'
            },
            style: {
                fontSize: '14px',
                fontFamily: 'inherit',
                fontWeight: 'medium'
            },
            dropShadow: {
                enabled: false
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return val + ' users'
                }
            }
        }
    }

    return (
        <div>
            <h3 className="mb-4 text-lg font-medium">{title}</h3>
            <Chart options={options} series={data} type={type} height={300} />
        </div>
    )
}

PieChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['pie', 'donut']),
    colors: PropTypes.arrayOf(PropTypes.string)
}

PieChart.defaultProps = {
    type: 'donut',
    colors: ['#14b8a6', '#0d9488']
}

export default PieChart
