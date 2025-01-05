import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';  // Icon người dùng từ @ant-design/icons

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    // Kiểm tra trạng thái đăng nhập (user session)
    const userSession = sessionStorage.getItem('userSession');
    const PuserSession = JSON.parse(userSession);

    const fetchPrograms = async () => {
        try {
            const response = await axios.get("http://localhost:5169/GetProgram");
            setPrograms(response.data);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    };

    const handleProgramClick = (id) => {
        
        navigate(`/programs/${id}`);
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            console.log(userSession);
            fetchPrograms();
        }
    }, [mobileMenuOpen]);

    const toggleDropdown = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    // Hàm để điều hướng đến trang thông tin người dùng
    const navigateToUserDetail = () => {
        // Chỉ gọi hàm điều hướng khi nhấn nút
        if (PuserSession) {
            navigate(`/users/${PuserSession.id}`);
        }
    };

    return (
        <header className="bg-white sticky top-0 z-50">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
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
                            Product
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
                                            onClick={() => handleProgramClick(item.id)}
                                        >
                                            <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            </div>
                                            <div className="flex-auto">
                                                <a className="block font-semibold text-gray-900">
                                                    {item.programName}
                                                    <span className="absolute inset-0" />
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </PopoverPanel>
                    </Popover>

                    <a href="/Contact" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-900">
                        Contact Us
                    </a>
                    <a href="/About" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-900">
                        About Us
                    </a>
                    <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-900">
                        Company
                    </a>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {userSession ? (
                        // Nếu người dùng đã đăng nhập, hiển thị icon người dùng
                        <button
                            onClick={navigateToUserDetail} // Sửa lại, gọi hàm xử lý sự kiện, không phải gọi hàm ngay
                            className="text-sm/6 font-semibold text-gray-900 flex items-center"
                        >
                            <UserOutlined className="mr-2" /> {/* Icon người dùng */}
                            User Profile
                        </button>
                    ) : (
                        <a href="/auth" className="text-sm/6 font-semibold text-gray-900">
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
    );
     

}
