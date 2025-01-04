import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, notification, Select } from "antd";
import axios from "axios";

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5169/api/User");
            setUsers(response.data);
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Không thể lấy dữ liệu người dùng.",
            });
        }
    };

    // Handle Add or Update User
    const handleAddOrUpdate = async (values) => {
        const payload = {
            id: editingUser?.id || 0,
            fullName: values.fullName,
            userName: values.userName,
            email: values.email,
            role: values.role,
            status: values.status,
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
        };

        if (values.password) {
            payload.password = values.password;
        }

        try {
            if (editingUser) {
                await axios.post("http://localhost:5169/api/User/UpdateUser", payload);
                notification.success({
                    message: "Thành công",
                    description: "Người dùng đã được cập nhật.",
                });
            } else {
                await axios.post("http://localhost:5169/api/User/CreateUser", payload);
                notification.success({
                    message: "Thành công",
                    description: "Người dùng mới đã được thêm.",
                });
            }

            setIsModalVisible(false);
            setEditingUser(null);
            form.resetFields();
            fetchUsers();
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Không thể lưu người dùng.",
            });
        }
    };

    // Handle Delete User
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5169/api/User/${id}`);
            notification.success({
                message: "Thành công",
                description: "Người dùng đã được xóa.",
            });
            fetchUsers();
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Không thể xóa người dùng.",
            });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Define Table Columns
    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "stt",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Action",
            key: "actions",
            render: (_, record) => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => {
                            setEditingUser(record);
                            setIsModalVisible(true);
                            form.setFieldsValue({
                                fullName: record.fullName,
                                userName: record.userName,
                                email: record.email,
                                role: record.role,
                                status: record.status,
                            });
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDelete(record.id)}
                        style={{ marginLeft: 10 }}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <h2 className="text-center text-2xl font-bold mt-10 mb-5">Quản lý Người dùng</h2>
            <Button
                type="primary"
                style={{ marginBottom: 20 }}
                onClick={() => {
                    setEditingUser(null);
                    setIsModalVisible(true);
                    form.resetFields();
                }}
            >
                Thêm Người dùng
            </Button>
            <Table
                columns={columns}
                dataSource={users.map((item) => ({ ...item, key: item.id }))}
            />

            <Modal
                title={editingUser ? "Sửa Người dùng" : "Thêm Người dùng"}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingUser(null);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddOrUpdate}>
                    <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="userName"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Vui lòng nhập email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            { required: !editingUser, message: "Vui lòng nhập mật khẩu" },
                            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                        ]}
                    >
                        <Input.Password placeholder={editingUser ? "Để trống nếu không đổi mật khẩu" : ""} />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: "Vui lòng nhập vai trò" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUser;
