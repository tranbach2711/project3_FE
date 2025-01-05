import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Giả sử bạn đã có hook useSession để quản lý phiên người dùng


const Donate = () => {
    const { programId } = useParams(); // Lấy programId từ URL
    const [donationAmount, setDonationAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [causeId, setCauseId] = useState('');
    const [causeList, setCauseList] = useState([]); // Danh sách cause lấy từ API
    const [accNumber, setAccNumber] = useState('');
    const [program, setProgram] = useState({});

    useEffect(() => {
        // Lấy thông tin chương trình
        const fetchProgram = async () => {
            try {
                const response = await axios.get(`http://localhost:5169/GetProgram`);
                setProgram(response.data);
            } catch (error) {
                console.error('Error fetching program:', error);
            }
        };

        // Lấy danh sách cause
        const fetchCauseList = async () => {
            try {
                const response = await axios.get('http://localhost:5169/GetCause'); // Giả sử API này trả về danh sách cause
                setCauseList(response.data);
                if (response.data.length > 0) {
                    setCauseId(response.data[0].id); // Gán mặc định causeId đầu tiên
                }
            } catch (error) {
                console.error('Error fetching cause list:', error);
            }
        };

        fetchProgram();
        fetchCauseList();
    }, [programId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationData = {
            programId: parseInt(programId, 10),
            causeId: parseInt(causeId, 10),
            userId: parseInt(userId, 10),
            accNumber: paymentMethod === 'Bank Transfer' ? accNumber : null,
            donationAmount: parseFloat(donationAmount),
            paymentMethod,
            paymentStatus: 'Pending', // Mặc định trạng thái
            paymentDate: new Date().toISOString(),
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
        };

        try {
            const response = await axios.post('/api/donations', donationData);
            console.log('Donation successful:', response.data);
            alert('Thank you for your donation!');
        } catch (error) {
            console.error('Error making donation:', error);
            alert('Failed to process donation. Please try again.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <img
                        src={program.img || 'https://via.placeholder.com/800x400.png?text=No+Image'}
                        alt={program.program_name || 'Program'}
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-30" />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <h1 className="text-4xl text-white font-bold">{program.program_name || 'Program Name'}</h1>
                    </div>
                </div>

                <div className="px-6 py-8">
                    <h2 className="text-3xl font-semibold text-gray-900">Donate to this Program</h2>
                    <p className="mt-2 text-gray-600">{program.description || 'Program Description'}</p>

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
                                {causeList.map((cause) => (
                                    <option key={cause.id} value={cause.id}>
                                        {cause.name}
                                    </option>
                                ))}
                            </select>
                        </div>

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
