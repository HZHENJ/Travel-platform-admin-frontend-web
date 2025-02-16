import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'

const Dropdown = ({
    options,
    value,
    onChange,
    placeholder = 'Select option',
    buttonClassName = '',
    menuItemClassName = ''
}) => {
    const selectedOption = options.find((opt) => opt.value === value)

    return (
        <Menu as="div" className="relative inline-block w-full text-left">
            <Menu.Button
                className={`inline-flex w-full items-center justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 ${buttonClassName}`}
            >
                <span className={!selectedOption ? 'text-gray-400' : ''}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
            </Menu.Button>

            <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none">
                <div className="py-1">
                    {options.map((option) => (
                        <Menu.Item key={option.value}>
                            {({ active }) => (
                                <button
                                    type="button"
                                    onClick={() => onChange(option.value)}
                                    className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} ${value === option.value ? 'bg-gray-50' : ''} ${menuItemClassName} `}
                                >
                                    {option.label}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </div>
            </Menu.Items>
        </Menu>
    )
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    buttonClassName: PropTypes.string,
    menuItemClassName: PropTypes.string
}

export default Dropdown
