import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
    ChartBarIcon,
    PaperAirplaneIcon,
    BuildingOfficeIcon,
    PhotoIcon,
    StarIcon,
    ArrowRightStartOnRectangleIcon,
    BookOpenIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAdmin } from '@/hooks/useAdmin'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Booking', href: '/booking', icon: BookOpenIcon },
    { name: 'Flight', href: '/flight', icon: PaperAirplaneIcon },
    { name: 'Hotel', href: '/hotel', icon: BuildingOfficeIcon },
    { name: 'Attraction', href: '/attraction', icon: PhotoIcon },
    { name: 'Reviews', href: '/reviews', icon: StarIcon }
]

const userNavigation = [{ name: 'Logout', href: '/' }]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SidebarLayout = () => {
    const location = useLocation()
    const [searchTerm, setSearchTerm] = useState('')
    const { adminData, isLoading, error, handleLogout } = useAdmin()

    // Filter navigation items based on search term
    const filteredNavigation = navigation.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (isLoading) {
        return null // Or a loading spinner
    }

    if (error) {
        return null // Or an error message
    }

    return (
        <div className="min-h-screen">
            <nav className="fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white pb-10">
                <div className="flex h-16 items-center border-b border-gray-200 px-6">
                    <span className="text-xl font-semibold text-gray-900">
                        Singapore Travel
                    </span>
                </div>
                <div className="mt-6 flex flex-1 flex-col px-4">
                    <div className="relative mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search menu..."
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-gray-300 outline-none ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 focus:ring-inset sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="space-y-4">
                        {filteredNavigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                    location.pathname === item.href
                                        ? 'bg-teal-50 text-teal-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600',
                                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        location.pathname === item.href
                                            ? 'text-teal-600'
                                            : 'text-gray-400 group-hover:text-teal-600',
                                        'mr-3 h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    {searchTerm === '' && (
                        <div className="mt-auto pt-6">
                            <button
                                onClick={handleLogout}
                                className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                            >
                                <ArrowRightStartOnRectangleIcon
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-teal-600"
                                    aria-hidden="true"
                                />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
            <div className="pl-64">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
                    <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <Menu as="div" className="relative">
                                <MenuButton className="-m-1.5 flex items-center p-1.5">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        alt="Avatar"
                                        src={`https://ui-avatars.com/api/?name=${adminData?.username || 'User'}`}
                                        className="size-8 rounded-full bg-gray-50"
                                    />
                                    <span className="hidden lg:flex lg:items-center">
                                        <span
                                            aria-hidden="true"
                                            className="ml-4 text-sm/6 font-semibold text-gray-900"
                                        >
                                            {adminData?.username}
                                        </span>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="ml-2 size-5 text-gray-400"
                                        />
                                    </span>
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <button
                                                onClick={handleLogout}
                                                className="data-focus-bg-gray-50 data-focus-outline-hidden block w-full px-3 py-1 text-left text-sm/6 text-gray-900"
                                            >
                                                {item.name}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
                <main className="min-h-screen bg-gray-50 px-8 py-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default SidebarLayout
