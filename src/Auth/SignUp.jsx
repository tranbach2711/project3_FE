import { Button, Form, Input, Alert, notification } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const onFinish = async (values) => {
        console.log("Form Values:", values);

        if (values.password !== values.passwordAgain) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5169/api/User/CreateUser", {
                fullName: values.fullname,
                userName: values.username,
                password: values.password,
                email: values.email,
                role: "00",
                status: "00",

            });
            if (response.data.code == "00") {
                notification.success({
                    message: 'Đăng ký thành công',
                    description: 'Bạn đã đăng ký thành công. Vui lòng đăng nhập.',
                });
                setTimeout(() => {
                    navigate("/auth");
                }, 2000)
            } else {
                setErrorMessage(response.data.error);;
            }
        } catch (error) {
            setErrorMessage("An error occurred during registration");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign up to your account
            </h2>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
                        <Form
                            name="register"
                            labelCol={{ span: 8 }}
                            layout="vertical"
                            // wrapperCol={{ span: 16 }}
                            // style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Fullname"
                                name="fullname"
                                rules={[{ required: true, message: "Nhập họ và tên người dùng" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: "Nhập tên người dùng" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nhập email!"
                                    },
                                    {
                                        type: "email",
                                        message: "Địa chỉ email không hợp lệ!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: "Nhập mật khẩu" }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Xác nhận mật khẩu"
                                name="passwordAgain"
                                rules={[{ required: true, message: "Nhập lại mật khẩu" }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <div className="text-center mt-4">
                                    <span className="text-sm text-gray-500">Bạn đã có tài khoản? </span>
                                    <Link to="/auth" className="text-sm text-blue-500 hover:text-blue-700">
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
