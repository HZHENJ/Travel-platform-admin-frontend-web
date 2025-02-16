import PropTypes from 'prop-types'

export const CheckboxInput = ({ checked, onChange, name, label }) => {
    return (
        <div className="flex gap-3">
            <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                    <input
                        id={name}
                        name={name}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-teal-600 checked:bg-teal-600 indeterminate:border-teal-600 indeterminate:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                    >
                        <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                        />
                    </svg>
                </div>
            </div>
            <label htmlFor={name} className="block text-sm/6 text-gray-900">
                {label}
            </label>
        </div>
    )
}

CheckboxInput.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

export default CheckboxInput
