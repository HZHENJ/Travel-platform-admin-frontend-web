import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Calendar = ({ onDateSelect, visitDates = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [markedDates, setMarkedDates] = useState(new Set())
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    useEffect(() => {
        // Convert visitDates to a Set of date strings for easy lookup
        const dates = new Set(
            visitDates.map((date) => new Date(date).toDateString())
        )
        setMarkedDates(dates)
    }, [visitDates])

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const previousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        )
    }

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        )
    }

    const isVisitDate = (day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        ).toDateString()
        return markedDates.has(date)
    }

    const handleDateClick = (day) => {
        const selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        )
        onDateSelect?.(selectedDate)
    }

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDay = getFirstDayOfMonth(currentDate)
        const days = []

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8" />)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isVisit = isVisitDate(day)
            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`flex h-8 cursor-pointer items-center justify-center rounded-full text-sm ${isVisit ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' : 'hover:bg-gray-100'}`}
                >
                    {day}
                </div>
            )
        }

        return days
    }

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-medium text-gray-900">
                    {currentDate.toLocaleString('default', {
                        month: 'long',
                        year: 'numeric'
                    })}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={previousMonth}
                        className="rounded-full p-1 hover:bg-gray-100"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="rounded-full p-1 hover:bg-gray-100"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className="flex h-8 items-center justify-center text-xs font-medium text-gray-500"
                    >
                        {day}
                    </div>
                ))}
                {renderCalendar()}
            </div>
        </div>
    )
}

Calendar.propTypes = {
    onDateSelect: PropTypes.func,
    visitDates: PropTypes.arrayOf(PropTypes.string)
}

Calendar.defaultProps = {
    onDateSelect: () => {},
    visitDates: []
}

export default Calendar
