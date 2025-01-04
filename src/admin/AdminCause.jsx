import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, notification } from "antd";
import axios from "axios";

const AdminCause = () => {
  const [causes, setCauses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCause, setEditingCause] = useState(null);
  const [form] = Form.useForm();

  // Fetch Causes from API
  const fetchCauses = async () => {
    try {
      const response = await axios.get("http://localhost:5169/GetCause");
      setCauses(response.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to fetch Cause data.",
      });
    }
  };

  // Handle Add or Update Cause
  const handleAddOrUpdate = async (values) => {
    const payload = {
      id: editingCause?.id || 0,
      causeName: values.causeName,
      depcription: values.depcription,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    };

    try {
      if (editingCause) {
        await axios.post("http://localhost:5169/UpdateCause", payload);
        notification.success({
          message: "Success",
          description: "Cause updated successfully.",
        });
      } else {
        await axios.post("http://localhost:5169/CreateCause", payload);
        notification.success({
          message: "Success",
          description: "New Cause added successfully.",
        });
      }

      setIsModalVisible(false);
      setEditingCause(null);
      form.resetFields();
      fetchCauses();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to save Cause.",
      });
    }
  };

  // Handle Delete Cause
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5169/causes/${id}`);
      notification.success({
        message: "Success",
        description: "Cause deleted successfully.",
      });
      fetchCauses();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to delete Cause.",
      });
    }
  };

  useEffect(() => {
    fetchCauses();
  }, []);

  // Define Table Columns
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Cause Name",
      dataIndex: "causeName",
      key: "causeName",
    },
    {
      title: "Description",
      dataIndex: "depcription",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => {
              setEditingCause(record);
              setIsModalVisible(true);
              form.setFieldsValue({
                causeName: record.causeName,
                depcription: record.depcription,
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
      <h2 className="text-center text-2xl font-bold mt-10 mb-5">Quản lý Causes</h2>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => {
          setEditingCause(null);
          setIsModalVisible(true);
          form.resetFields();
        }}
      >
        Thêm
      </Button>
      <Table
        columns={columns}
        dataSource={causes.map((item) => ({ ...item, key: item.id }))}
      />

      <Modal
        title={editingCause ? "Sửa" : "Xóa"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCause(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrUpdate}>
          <Form.Item
            name="causeName"
            label="Cause Name"
            rules={[{ required: true, message: "Please enter the cause name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="depcription"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCause;