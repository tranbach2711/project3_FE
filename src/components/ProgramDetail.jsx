import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data for testing UI
const mockProgram = {
    id: 1,
    program_name: 'Program for Clean Water',
    description:
        'This program focuses on providing clean and safe drinking water to underserved communities. We aim to install water filtration systems in remote villages to improve health and quality of life.',
    img: 'https://via.placeholder.com/800x400.png?text=Program+Image',
    ngo_id: 101,
    create_time: '2023-01-15T12:00:00Z',
    update_time: '2023-01-16T12:00:00Z',
};

const ProgramDetail = () => {
    const { id } = useParams(); // Get program ID from URL
    const navigate = useNavigate(); // Initialize navigate function
    const [program, setProgram] = useState(null);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchProgramDetail = () => {
            // Temporary mock data
            setProgram(mockProgram);
        };

        fetchProgramDetail();
    }, [id]);

    if (!program) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header Section */}
                <div className="relative">
                    <img
                        src={program.img}
                        alt={program.program_name}
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-30" />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <h1 className="text-4xl text-white font-bold">{program.program_name}</h1>
                    </div>
                </div>

                {/* Detail Section */}
                <div className="px-6 py-8">
                    <p className="text-gray-600 text-sm">
                        <strong>Created at:</strong> {new Date(program.create_time).toLocaleDateString()} <br />
                        <strong>Updated at:</strong> {new Date(program.update_time).toLocaleDateString()}
                    </p>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
                        <p className="mt-2 text-gray-700">{program.description}</p>
                    </div>

                    {/* NGO Section */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-900">NGO Info</h2>
                        <p className="mt-2 text-gray-600">NGO ID: {program.ngo_id}</p>
                    </div>

                    {/* Donate Button */}
                    <div className="mt-6">
                        <button
                            onClick={() => navigate(`/donate/${program.id}`)} // Navigate to Donate route
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                        >
                            Donate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetail;
