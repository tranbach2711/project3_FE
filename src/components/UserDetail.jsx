import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
    const mockUserData = [sessionStorage.getItem('userSession')];
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        role: '',
        status: '',
    });

    useEffect(() => {
        const userData = mockUserData.find((user) => {
            try {
                return JSON.parse(user).id === parseInt(id);
            } catch {
                console.error('Invalid user data in sessionStorage');
                return false;
            }
        });

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            setFormData({
                fullName: parsedUserData.fullName || '',
                userName: parsedUserData.userName || '',
                email: parsedUserData.email || '',
                role: parsedUserData.role === '00' ? 'User' : 'Admin',
                status: parsedUserData.status === '00' ? 'Active' : 'Inactive',
            });
        }
    }, [id]);

    const mapRole = (role) => (role === 'User' ? '00' : '01');
    const mapStatus = (status) => (status === 'Active' ? '00' : '01');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('userSession');
            alert('Logged out successfully!');
            navigate('/');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            fullName: formData.fullName.trim(),
            userName: formData.userName.trim(),
            email: formData.email.trim(),
            password: "", // Maintain the existing password
            role: mapRole(formData.role),
            status: mapStatus(formData.status),
            createTime: user.createTime, // Maintain the existing create time
            updateTime: new Date().toISOString(), // Current time as update time
        };

        try {
            console.log('Payload sent to API:', updatedUser);

            const response = await axios.post('http://localhost:5169/api/User/UpdateUser', updatedUser);
            console.log('API response:', response.data);

            setUser(updatedUser);
            setIsEditing(false);
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
            alert('Failed to update user. Check the console for details.');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-3xl">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">{isEditing ? 'Edit User' : 'User Details'}</h2>
            <div className="mt-6">
                {!isEditing ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="flex justify-end font-semibold">Full Name:</div>
                            <div className="flex justify-start">{user.fullName}</div>

                            <div className="flex justify-end font-semibold">Username:</div>
                            <div className="flex justify-start">{user.userName}</div>

                            <div className="flex justify-end font-semibold">Email:</div>
                            <div className="flex justify-start">{user.email}</div>

                            <div className="flex justify-end font-semibold">Role:</div>
                            <div className="flex justify-start">{formData.role}</div>

                            <div className="flex justify-end font-semibold">Status:</div>
                            <div className="flex justify-start">{formData.status}</div>
                        </div>

                        <div className="mt-4 flex gap-4 justify-center">
                            <button onClick={() => setIsEditing(true)} className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Edit
                            </button>
                            <button onClick={handleLogout} className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700">
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpdateUser} className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-4 justify-center">
                            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Save Changes
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
