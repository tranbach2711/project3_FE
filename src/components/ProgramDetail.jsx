import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProgramDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Dùng để chuyển trang
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProgramDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5169/GetProgram`);
            
                const programData = response.data.find((item) => item.id === parseInt(id));
                if (programData) {
                    setProgram(programData);
                } else {
                    setError("Program not found");
                }
            } catch (err) {
                setError("Failed to fetch program details");
            } finally {
                setLoading(false);
            }
        };

        fetchProgramDetail();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header Section */}
                <div className="relative">
                    <img
                        src={program.img.startsWith("http") ? program.img : `http://localhost:5173/images/${program.img}`}
                        alt={program.programName}
                         className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-30" />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <h1 className="text-4xl text-white font-bold">{program.programName}</h1>
                    </div>
                </div>

                {/* Detail Section */}
                <div className="px-6 py-8">
                    <p className="text-gray-600 text-sm">
                        <strong>Created at:</strong> {new Date(program.createTime).toLocaleDateString()} <br />
                        <strong>Updated at:</strong> {new Date(program.updateTime).toLocaleDateString()}
                    </p>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
                        <p className="mt-2 text-gray-700">{program.depcription}</p>
                    </div>

                    {/* NGO Section */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-900">NGO Info</h2>
                        <p className="mt-2 text-gray-600">NGO ID: {program.ngoId}</p>
                    </div>

                    {/* Donate Button */}
                    <div className="mt-6">
                        <button
                            onClick={() => navigate(`/donate/${program.id}`)}
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
