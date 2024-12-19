import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const App = () => {
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

      console.log("Response từ API:", response.data);

      if (response.data) {
        setResponseData(response.data);

        notification.success({
          message: "Đăng nhập thành công",
          description: `Chào mừng, ${response.data.userName}`,
        });


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
      </Form>


    </div>
  );
};

export default App;
