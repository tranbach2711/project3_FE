import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const App = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState(""); // State cho username
  const [password, setPassword] = useState(""); // State cho password
  const [responseData, setResponseData] = useState(null); // State lưu kết quả từ BE
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate(); // Hook điều hướng trang

  // Hàm xử lý form submit
  const onFinish = async () => {
    try {
      // Gửi request API
      const response = await axios.post("http://localhost:5169/api/User/Login", {
        user: username, // Gửi state username
        password: password, // Gửi state password
      });

      console.log("Response từ API:", response.data);

      if (response.data.userName=="nguyenvana" ) {
        setResponseData(response.data); // Lưu kết quả API vào state

        notification.success({
          message: "Đăng nhập thành công",
          description: `Chào mừng, ${response.data.user}`,
        });

        // Điều hướng đến trang Home
        navigate("/home");
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
      {/* Hiển thị lỗi */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Form đăng nhập */}
      <Form
        form={form}
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
        {/* Username */}
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Nhập tên người dùng!" }]}
        >
          <Input
            placeholder="Nhập tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Two-way binding
          />
        </Form.Item>

        {/* Password */}
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

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      {/* Hiển thị thông tin phản hồi từ API */}
      {responseData && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h3>Thông tin từ Backend:</h3>
          <p><strong>User:</strong> {responseData.user}</p>
          <p><strong>Password:</strong> {responseData.password}</p>
        </div>
      )}
    </div>
  );
};

export default App;
