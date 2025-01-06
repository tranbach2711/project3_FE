import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, notification } from "antd";
import axios from "axios";

const AdminNgo = () => {
  const [ngos, setNgos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNgo, setEditingNgo] = useState(null);
  const [form] = Form.useForm();

  // Fetch NGOs from API
  const fetchNgos = async () => {
    try {
      const response = await axios.get("http://localhost:5169/GetNgo");
      setNgos(response.data);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể lấy dữ liệu NGO.",
      });
    }
  };

  // Handle Add or Update NGO
  const handleAddOrUpdate = async (values) => {
    const payload = {
      id: editingNgo?.id || 0,
      name: values.name,
      address: values.address,
      email: values.email,
      phone: values.phone,
      website: values.website,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    };

    try {
      if (editingNgo) {
        console.log(payload)
        await axios.post("http://localhost:5169/UpdateNgo", payload);
        notification.success({
          message: "Thành công",
          description: "NGO đã được cập nhật.",
        });
      } else {
        await axios.post("http://localhost:5169/CreateNgo", payload);
        notification.success({
          message: "Thành công",
          description: "NGO mới đã được thêm.",
        });
      }

      setIsModalVisible(false);
      setEditingNgo(null);
      form.resetFields();
      fetchNgos();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể lưu NGO.",
      });
    }
  };

  // Handle Delete NGO
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5169/ngo/${id}`);
      notification.success({
        message: "Thành công",
        description: "NGO đã được xóa.",
      });
      fetchNgos();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể xóa NGO.",
      });
    }
  };

  useEffect(() => {
    fetchNgos();
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span style={{ display: "flex", justifyContent: "space-between"}}>
          <Button
            type="primary"
            onClick={() => {
              setEditingNgo(record);
              setIsModalVisible(true);
              form.setFieldsValue({
                name: record.name,
                address: record.address,
                email: record.email,
                phone: record.phone,
                website: record.website,
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
      <h2 className="text-center text-2xl font-bold mt-10 mb-5">Quản lý NGO</h2>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => {
          setEditingNgo(null);
          setIsModalVisible(true);
          form.resetFields();
        }}
      >
        Thêm NGO
      </Button>
      <Table
        columns={columns}
        dataSource={ngos.map((item) => ({ ...item, key: item.id }))}
      />

      <Modal
        title={editingNgo ? "Sửa NGO" : "Thêm NGO"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingNgo(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrUpdate}>
          <Form.Item
            name="name"
            label="Tên NGO"
            rules={[{ required: true, message: "Vui lòng nhập tên NGO" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
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
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true, message: "Vui lòng nhập website" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminNgo;
