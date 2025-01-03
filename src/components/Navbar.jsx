'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios';


export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login
    const [userAvatar, setUserAvatar] = useState('https://via.placeholder.com/40');

    const fetchPrograms = async () => {
        try {
            const response = await axios.get("http://localhost:5169/GetProgram");
            console.log(response.data);
            setPrograms(response.data);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    };

    useEffect(() => {
        // Lắng nghe trạng thái mobileMenuOpen thay đổi và chỉ gọi API khi menu mở
        if (mobileMenuOpen) {
            fetchPrograms();
        }
    }, [mobileMenuOpen]);

    const toggleDropdown = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
        }
    }

    const handleLogin = () => {
        setIsLoggedIn(true);
        // Example: Set the avatar after successful login
        setUserAvatar('https://via.placeholder.com/40?text=User');
    };

    return (
        <header className="bg-white sticky top-0 z-50">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="public/images/logo/logo.png"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton onClick={toggleDropdown} className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-blue-900">
                            Programs
                            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4">
                                {programs.length > 0 ? (
                                    programs.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                        >
                                            <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            </div>
                                            <div className="flex-auto">
                                                <a href="#" className="block font-semibold text-gray-900">
                                                    {item.programName}
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">{item.depcription}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>

                        </PopoverPanel>
                    </Popover>

                    <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-900">
                        Contact Us
                    </a>
                    <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-900">
                        About Us
                    </a>
                    <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-900">
                        Donate
                    </a>
                    {/* search */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end hover:text-blue-900">
                        <div className="relative">
                            <input
                                type="text"
                                className={`bg-white h-10 px-5 pr-10 rounded-full text-sm border hover:border-black focus:outline-none transition-all duration-300 ease-in-out ${isFocused ? "w-64" : "w-12"
                                    }`}
                                placeholder="Search..."
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => !value && setIsFocused(false)}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                <svg
                                    className="h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </PopoverGroup>
                {/* login */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isLoggedIn ? (
                        <div className="relative">
                            <img
                                src={userAvatar}
                                alt="User Avatar"
                                className="h-10 w-10 rounded-full cursor-pointer"
                            />
                            {/* Optionally, you can add a dropdown menu when clicking the avatar */}
                        </div>
                    ) : (
                        <a
                            href="/auth"
                            onClick={handleLogin} // Simulating login on click
                            className="text-sm/6 font-semibold text-gray-900 hover:text-blue-900"
                        >
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                        Product
                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                                    </DisclosureButton>

                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
