import PropTypes from 'prop-types'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

export const Alert = ({ message, className = '' }) => {
    return (
        <div className={`mb-8 rounded-lg bg-red-50 p-4 ${className}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700">{message}</p>
                </div>
            </div>
        </div>
    )
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    className: PropTypes.string
}

Alert.defaultProps = {
    className: ''
}

export default Alert
