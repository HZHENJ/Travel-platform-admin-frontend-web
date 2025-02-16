import PropTypes from 'prop-types'

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`rounded-lg bg-white shadow ${className}`}>
            {children}
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default Card
