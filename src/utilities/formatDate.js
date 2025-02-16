export const formatDate = (dateString) => {
    if (!dateString) return ''

    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return dateString

        // Array of month names
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]

        const day = String(date.getDate()).padStart(2, '0')
        const month = months[date.getMonth()]
        const year = date.getFullYear()

        return `${day} ${month} ${year}`
    } catch (error) {
        console.error('Error formatting date:', error)
        return dateString
    }
}
