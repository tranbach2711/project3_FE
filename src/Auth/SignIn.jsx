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
        User: username,
        Password: password,
      });
      console.log(response.data)
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
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}


      <Form
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
  );
};

export default SignIn;
