// src/components/forms/PasswordInput.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export const PasswordInput = ({
    value,
    onChange,
    name = 'password',
    required = false,
    className = ''
}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative mt-2">
            <input
                id={name}
                name={name}
                type={showPassword ? 'text' : 'password'}
                required={required}
                value={value}
                onChange={onChange}
                autoComplete="current-password"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6 ${className}`}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
                {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
            </button>
        </div>
    )
}

PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string
}

PasswordInput.defaultProps = {
    name: 'password',
    required: false,
    className: ''
}

export default PasswordInput
