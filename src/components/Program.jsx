import { useState } from 'react';

const callouts = [
    {
        name: 'Desk and Office',
        description: 'Work from home accessories',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-01.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
    },
    {
        name: 'Self-Improvement',
        description: 'Journals and note-taking',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-02.jpg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
    },
    {
        name: 'Travel',
        description: 'Daily commute essentials',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-03.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
    {
        name: 'Self-Improvement',
        description: 'Journals and note-taking',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-02.jpg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
    },
    {
        name: 'Travel',
        description: 'Daily commute essentials',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-03.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
    {
        name: 'Desk and Office',
        description: 'Work from home accessories',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-01.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
    },
]

export default function Example() {
    const itemsPerPage = 3;
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalPages = Math.ceil(callouts.length / itemsPerPage);

    // Handle moving to the previous page
    const goToPreviousPage = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    // Handle moving to the next page
    const goToNextPage = () => {
        setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    // Get the products for the current page
    const displayedCallouts = callouts.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <div className="flex items-center justify-center space-x-4">
                        <hr className="flex-1 border-t-2 border-gray-300" />
                        <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
                        <hr className="flex-1 border-t-2 border-gray-300" />
                    </div>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {displayedCallouts.map((callout) => (
                            <div key={callout.name} className="group relative">
                                <img
                                    alt={callout.imageAlt}
                                    src={callout.imageSrc}
                                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                />
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href={callout.href}>
                                        <span className="absolute inset-0" />
                                        {callout.name}
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls - Arrows */}
                    <div className="mt-6 flex justify-between items-center">
                        {/* Left Arrow */}
                        <button
                            onClick={goToPreviousPage}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <span className="text-gray-800 text-xl">&#8592;</span> {/* Left Arrow */}
                        </button>

                        {/* Page Number (Optional) */}
                        <span className="text-gray-700">
                            Page {currentIndex + 1} of {totalPages}
                        </span>

                        {/* Right Arrow */}
                        <button
                            onClick={goToNextPage}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <span className="text-gray-800 text-xl">&#8594;</span> {/* Right Arrow */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
