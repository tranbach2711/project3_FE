import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();


  const onFinish = async () => {
    try {

      const response = await axios.post("http://localhost:5169/api/User/Login", {
        user: username,
        password: password,
      });

      if (response.data) {
        sessionStorage.setItem("userSession", JSON.stringify(response.data));

        notification.success({
          message: "Đăng nhập thành công",
          description: `Chào mừng, ${response.data.userName}`,
        });


        navigate("/");
      } else {
        setErrorMessage("Tên đăng nhập hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!");
    }
  };

  return (
    // <div className="grid grid-cols-2 gap-4">
    //   <div>
    //     <img
    //       src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=600"
    //       alt=""
    //       className="w-full h-full object-cover"
    //     />
    //   </div>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              className="space-y-6"
              form={form}
              name="login"
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
            >

              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Nhập tên người dùng!" }]}
              >
                <Input
                  placeholder="Nhập tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>


              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Nhập mật khẩu!" }]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Two-way binding
                />
              </Form.Item>


              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Đăng nhập
                </Button>
              </Form.Item>

              <Form.Item>
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-500">Bạn chưa có tài khoản? </span>
                  <Link to="/auth/signup" className="text-sm text-blue-500 hover:text-blue-700">
                    Đăng ký ngay
                  </Link>
                </div>
              </Form.Item>
            </Form>

          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SignIn;
