import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dữ liệu giả
const mockUserData = [
    {
        id: 1,
        full_name: 'John Doe',
        user_name: 'johndoe',
        email: 'johndoe@example.com',
        role: 'admin',
        status: 'active',
    },
    {
        id: 2,
        full_name: 'Jane Smith',
        user_name: 'janesmith',
        email: 'janesmith@example.com',
        role: 'user',
        status: 'inactive',
    },
    {
        id: 3,
        full_name: 'Alice Johnson',
        user_name: 'alicejohnson',
        email: 'alicej@example.com',
        role: 'user',
        status: 'active',
    },
];

const UserDetail = () => {
    // Lấy giá trị từ session storage
    const value = sessionStorage.getItem('userSession');
    console.log(value); // "value"

    const { id } = useParams(); // Lấy ID người dùng từ URL
    const navigate = useNavigate(); // Dùng để chuyển hướng trang

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        role: '',
        status: '',
    });

    // Lấy dữ liệu giả từ mockUserData theo id
    useEffect(() => {
        const userData = mockUserData.find((user) => user.id === parseInt(id));
        if (userData) {
            setUser(userData);
            setFormData({
                fullName: userData.full_name,
                userName: userData.user_name,
                email: userData.email,
                role: userData.role,
                status: userData.status,
            });
        }
    }, [id]);

    // Handle input change for edit mode
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission (Update user)
    const handleUpdateUser = (e) => {
        e.preventDefault();
        setUser(formData);
        setIsEditing(false);
        alert('User updated successfully!');
    };

    // Handle delete user
    const handleDeleteUser = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            // Xóa người dùng khỏi mockUserData (Chỉ để kiểm tra UI)
            const updatedUsers = mockUserData.filter((user) => user.id !== parseInt(id));
            alert('User deleted successfully!');
            navigate('/admin/users'); // Chuyển hướng đến danh sách người dùng
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800">{isEditing ? 'Edit User' : 'User Details'}</h2>

            {/* User Detail Section */}
            <div className="mt-6">
                {isEditing ? (
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
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
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
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p><strong>Full Name:</strong> {user.full_name}</p>
                        <p><strong>Username:</strong> {user.user_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Status:</strong> {user.status}</p>

                        <div className="mt-4 flex gap-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
