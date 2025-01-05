import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Example() {
    const [programs, setPrograms] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const navigate = useNavigate(); // Initialize navigation hook

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5169/GetProgram');
                setPrograms(response.data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        fetchPrograms();
    }, []);

    const totalPages = Math.ceil(programs.length / itemsPerPage);

    const goToPreviousPage = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const goToNextPage = () => {
        setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    const displayedPrograms = programs.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

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
                        {displayedPrograms.map((program) => (
                            <div
                                key={program.id}
                                className="group relative cursor-pointer"
                                onClick={() => navigate(`/programs/${program.id}`)} // Navigate to ProgramDetail
                            >
                                <img
                                    alt={program.depcription}
                                    src={`http://localhost:5173/images/${program.img}`}
                                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                />
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <span className="absolute inset-0" />
                                    {program.programName}
                                </h3>
                                
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <button
                            onClick={goToPreviousPage}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <span className="text-gray-800 text-xl">&#8592;</span>
                        </button>

                        <span className="text-gray-700">
                            Page {currentIndex + 1} of {totalPages}
                        </span>

                        <button
                            onClick={goToNextPage}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <span className="text-gray-800 text-xl">&#8594;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
