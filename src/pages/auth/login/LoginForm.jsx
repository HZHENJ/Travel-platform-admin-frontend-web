import PropTypes from 'prop-types'
import { PasswordInput } from '@/components/forms/PasswordInput'

export const LoginForm = ({
    formData,
    isLoading,
    handleChange,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                >
                    Username
                    <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                >
                    Password
                    <span className="ml-1 text-red-500">*</span>
                </label>
                <PasswordInput
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='mt-8'>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-teal-500 focus:outline-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    )
}

LoginForm.propTypes = {
    formData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        rememberMe: PropTypes.bool.isRequired
    }).isRequired,
    isLoading: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

LoginForm.defaultProps = {
    isLoading: false
}

export default LoginForm
