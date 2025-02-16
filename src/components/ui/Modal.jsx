import PropTypes from 'prop-types'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle
} from '@headlessui/react'
import {
    ExclamationTriangleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'

const MODAL_TYPES = {
    success: {
        icon: CheckCircleIcon,
        iconClass: 'text-green-600',
        bgClass: 'bg-green-100',
        buttonClass: 'bg-green-600 hover:bg-green-500'
    },
    danger: {
        icon: ExclamationCircleIcon,
        iconClass: 'text-red-600',
        bgClass: 'bg-red-100',
        buttonClass: 'bg-red-600 hover:bg-red-500'
    },
    warning: {
        icon: ExclamationTriangleIcon,
        iconClass: 'text-yellow-600',
        bgClass: 'bg-yellow-100',
        buttonClass: 'bg-yellow-600 hover:bg-yellow-500'
    },
    info: {
        icon: InformationCircleIcon,
        iconClass: 'text-blue-600',
        bgClass: 'bg-blue-100',
        buttonClass: 'bg-blue-600 hover:bg-blue-500'
    }
}

const Modal = ({
    open,
    onClose,
    type = 'info',
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    showCancel = true,
    children
}) => {
    const modalConfig = MODAL_TYPES[type] || MODAL_TYPES.info
    const IconComponent = modalConfig.icon

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm()
        }
        onClose(false)
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="sm:flex sm:items-start">
                            {!children && (
                                <div
                                    className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${modalConfig.bgClass} sm:mx-0 sm:size-10`}
                                >
                                    <IconComponent
                                        className={`size-6 ${modalConfig.iconClass}`}
                                        aria-hidden="true"
                                    />
                                </div>
                            )}
                            <div
                                className={`mt-3 text-center ${!children ? 'sm:mt-0 sm:ml-4 sm:text-left' : 'w-full'}`}
                            >
                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold text-gray-900"
                                >
                                    {title}
                                </DialogTitle>
                                <div className="mt-2">
                                    {description && (
                                        <p className="text-sm text-gray-500">
                                            {description}
                                        </p>
                                    )}
                                    {children}
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs ${modalConfig.buttonClass} sm:ml-3 sm:w-auto`}
                            >
                                {confirmText}
                            </button>
                            {showCancel && (
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => onClose(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    {cancelText}
                                </button>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'warning', 'info']),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func,
    showCancel: PropTypes.bool,
    children: PropTypes.node
}

export default Modal
