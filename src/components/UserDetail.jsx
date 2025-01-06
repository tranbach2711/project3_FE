import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  // For API requests

const UserDetail = () => {
    // Lấy giá trị từ session storage
    const mockUserData = [sessionStorage.getItem('userSession')];

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
        const userData = mockUserData.find((user) => JSON.parse(user).id === parseInt(id));
        const parseuseData = JSON.parse(userData);

        if (parseuseData) {
            setUser(parseuseData);
            setFormData({
                fullName: parseuseData.fullName,
                userName: parseuseData.userName,
                email: parseuseData.email,
                role: parseuseData.role === '00' ? 'User' : 'Admin', // Map role dynamically
                status: parseuseData.status === '00' ? 'Active' : 'Inactive', // Map status dynamically
            });
        }
    }, [id]);

    // Map role and status for display
    const mapRole = (role) => (role === '00' ? 'User' : 'Admin');
    const mapStatus = (status) => (status === '00' ? 'Active' : 'Inactive');

    // Map role and status for update (convert back to '00' or '01')
    
    const mapStatusForUpdate = (status) => (status === 'Active' ? '00' : '01');

    // Handle input change for edit mode
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission (Update user)
    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,  // Keep the current ID
            fullName: formData.fullName,
            userName: formData.userName,
            email: formData.email,
            password: '0',  // Keep the existing password
            role: user.role, 
            status: mapStatusForUpdate(formData.status),
            createTime: new Date().toISOString(),   // Keep the existing create time
            updateTime: new Date().toISOString() // Set the current time as update time
        };

        try {
            console.log(updatedUser);  // Kiểm tra payload yêu cầu

            await axios.post('http://localhost:5169/api/User/UpdateUser', updatedUser);
            setUser(updatedUser);
            setIsEditing(false);
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
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
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-3xl">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">{isEditing ? 'Edit User' : 'User Details'}</h2>

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
                                    value={user.role === '00' ? 'User' : 'Admin'}
                                    readOnly 
                                    
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
                    <div className="flex flex-col items-center justify-center ">
                       <div className="grid grid-cols-2 gap-4">
    <div className="flex justify-end font-semibold">
        <p><strong>Full Name:</strong></p>
    </div>
    <div className="flex justify-start">
        <p>{user.fullName}</p>
    </div>

    <div className="flex justify-end font-semibold">
        <p><strong>Username:</strong></p>
    </div>
    <div className="flex justify-start">
        <p>{user.userName}</p>
    </div>

    <div className="flex justify-end font-semibold">
        <p><strong>Email:</strong></p>
    </div>
    <div className="flex justify-start">
        <p>{user.email}</p>
    </div>

    <div className="flex justify-end font-semibold">
        <p><strong>Role:</strong></p>
    </div>
    <div className="flex justify-start">
        <p>{mapRole(user.role)}</p>
    </div>

    <div className="flex justify-end font-semibold">
        <p><strong>Status:</strong></p>
    </div>
    <div className="flex justify-start">
        <p>{mapStatus(user.status)}</p>
    </div>
</div>

                        <div className="mt-4 flex gap-4 justify-center">
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
