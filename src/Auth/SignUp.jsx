import { Button, Form, Input, Alert, notification } from "antd";
import React, { useState } from "react";
import axios from "axios";
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
            if(response.data.code=="00"){
                notification.success({
                    message: 'Đăng ký thành công',
                    description: 'Bạn đã đăng ký thành công. Vui lòng đăng nhập.',
                });
                setTimeout(() => {
                    navigate("/auth");
                }, 2000)
            }else {
                setErrorMessage(response.data.error);;
            }
        } catch (error) {
            setErrorMessage("An error occurred during registration");
        }
    };

    return (
        <div>
            {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
            <Form
                name="register"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
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

                <Form.Item label={null}>
                    <Button htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUp;
