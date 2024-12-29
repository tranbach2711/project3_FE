import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Dữ liệu giả (mock data) để test giao diện
const mockProgram = {
    id: 1,
    program_name: 'Clean Water Initiative',
    description: 'Donate to help install water filtration systems in rural communities.',
    img: 'https://via.placeholder.com/800x400.png?text=Clean+Water+Program',
};

const mockCause = [
    { id: 1, name: 'Health and Sanitation' },
    { id: 2, name: 'Education' },
    { id: 3, name: 'Environment' },
];

const Donate = () => {
    const { programId } = useParams();
    const [donationAmount, setDonationAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [causeId, setCauseId] = useState(mockCause[0].id); // Default to the first cause
    const [paymentStatus, setPaymentStatus] = useState('Pending');
    const [accNumber, setAccNumber] = useState('');
    const [program, setProgram] = useState(mockProgram);

    useEffect(() => {
        // Fetch program details from API or use mock data
        const fetchProgram = async () => {
            // Normally, here we would fetch program details from an API
            // Example: const response = await axios.get(`/api/programs/${programId}`);
            // setProgram(response.data);
        };

        fetchProgram();
    }, [programId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gửi dữ liệu quyên góp đến backend
        const donationData = {
            programId,
            causeId,
            userId: 1, // Giả sử người dùng đang đăng nhập có ID 1
            donationAmount,
            paymentMethod,
            accNumber,
            paymentStatus,
        };

        try {
            // Giả sử bạn gửi API POST tới server
            // const response = await axios.post('/api/donations', donationData);
            console.log('Donation Data:', donationData);
            // alert('Donation successful!');
        } catch (error) {
            console.error('Error making donation:', error);
        }
    };

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

                {/* Donation Form Section */}
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-semibold text-gray-900">Donate to this Program</h2>
                    <p className="mt-2 text-gray-600">{program.description}</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div className="space-y-4">
                            <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700">
                                Donation Amount ($)
                            </label>
                            <input
                                type="number"
                                id="donationAmount"
                                name="donationAmount"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Select Cause */}
                        <div className="space-y-4">
                            <label htmlFor="cause" className="block text-sm font-medium text-gray-700">
                                Choose Cause
                            </label>
                            <select
                                id="cause"
                                name="cause"
                                value={causeId}
                                onChange={(e) => setCauseId(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            >
                                {mockCause.map((cause) => (
                                    <option key={cause.id} value={cause.id}>
                                        {cause.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-4">
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                                Payment Method
                            </label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="Paypal">Paypal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                        </div>

                        {/* Account Number for Bank Transfer */}
                        {paymentMethod === 'Bank Transfer' && (
                            <div className="space-y-4">
                                <label htmlFor="accNumber" className="block text-sm font-medium text-gray-700">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    id="accNumber"
                                    name="accNumber"
                                    value={accNumber}
                                    onChange={(e) => setAccNumber(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
                            >
                                Donate Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Donate;
