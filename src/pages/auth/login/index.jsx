import { Alert } from '@/components/ui/Alert'
import { LoginForm } from './LoginForm'
import { useLogin } from '@/hooks/useLogin'

const Login = () => {
    const { formData, error, isLoading, handleChange, handleSubmit } =
        useLogin()

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* <img
                        alt="Travel"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=teal&shade=600"
                        className="mx-auto h-10 w-auto"
                    /> */}
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Admin Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                        {error && <Alert message={error} />}
                        <LoginForm
                            formData={formData}
                            isLoading={isLoading}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
