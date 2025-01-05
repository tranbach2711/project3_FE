import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, notification,Select } from "antd";
import axios from "axios";

const AdminProgram = () => {
  const [ngos, setNgos] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [form] = Form.useForm();
  const [imgFileName, setImgFileName] = useState(""); // Lưu tên tệp trong state

  const mapLocalPathToUrl = (localPath) => {
    const fileName = localPath.split("\\").pop();
    return `http://localhost:5173/images/${fileName}`;
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:5169/GetProgram");
      setPrograms(response.data);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể lấy dữ liệu chương trình.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5169/program/${id}`);
      notification.success({
        message: "Thành công",
        description: "Chương trình đã được xóa.",
      });
      fetchPrograms();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể xóa chương trình.",
      });
    }
  };

  const handleAddOrUpdate = async (values) => {
    const payload = {
      id: editingProgram?.id || 0,
      programName: values.programName,
      depcription: values.depcription,
      img: imgFileName || editingProgram?.img,// Sử dụng imgFileName để lưu tên file
      ngoId: values.ngoId,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    };

    try {
      if (editingProgram) {
        await axios.post("http://localhost:5169/UpdateProgram", payload);
        notification.success({
          message: "Thành công",
          description: "Chương trình đã được cập nhật.",
        });
      } else {
        await axios.post("http://localhost:5169/CreatePrograms", payload);
        notification.success({
          message: "Thành công",
          description: "Chương trình mới đã được thêm.",
        });
      }

      setIsModalVisible(false);
      setEditingProgram(null);
      form.resetFields();
      fetchPrograms();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể lưu chương trình.",
      });
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get("http://localhost:5169/GetNgo");
        setNgos(response.data); // Giả sử response.data là một mảng các NGO
      } catch (error) {
        console.error("Error fetching NGOs:", error);
        notification.error({
          message: "Lỗi",
          description: "Không thể lấy dữ liệu NGO.",
        });
      }
    };

    fetchNgos();
  }, []);


  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Program Name",
      dataIndex: "programName",
      key: "programName",
    },
    {
      title: "Depcription",
      dataIndex: "depcription",
      key: "depcription",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => {
        const imageUrl = mapLocalPathToUrl(text);
        return (
          <img
            src={imageUrl}
            alt="Program"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "NGO",
      dataIndex: "ngoId",
      key: "ngoId",
      render: (ngoId) => {
        // Tìm NGO theo ID và hiển thị tên
        const ngo = ngos.find((item) => item.id === ngoId);
        return ngo ? ngo.name : "Chưa chọn";
      },
      // Thêm Select vào form để chọn NGO khi chỉnh sửa hoặc thêm mới
      editable: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span style={{ display: "flex", justifyContent: "space-between"}}>
          <Button
            type="primary"
            onClick={() => {
              setEditingProgram(record);
              setIsModalVisible(true);
              form.setFieldsValue({
                programName: record.programName,
                depcription: record.depcription,
                ngoId: record.ngoId,
              });
              setImgFileName(record.img); // Chỉ set lại tên ảnh khi sửa
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
      <h2 className="text-center text-2xl font-bold mt-10 mb-5">Quản lý chương trình</h2>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => {
          setEditingProgram(null);
          setIsModalVisible(true);
          form.resetFields();
          setImgFileName(""); // Reset imgFileName khi thêm mới
        }}
      >
        Thêm chương trình
      </Button>
      <Table
        columns={columns}
        dataSource={programs.map((item) => ({ ...item, key: item.id }))}
      />

      <Modal
        title={editingProgram ? "Sửa chương trình" : "Thêm chương trình"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingProgram(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrUpdate}>
          <Form.Item
            name="programName"
            label="Tên chương trình"
            rules={[{ required: true, message: "Vui lòng nhập tên chương trình" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="depcription"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="img"
            label="Đường dẫn ảnh"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const fileName = file.name;
                  setImgFileName(fileName); // Lưu tên file vào state
                }
              }}
              accept="image/*"
            />
          </Form.Item>

          <Form.Item label="Ảnh đã chọn">
            {imgFileName && (
              <img
                src={`http://localhost:5173/images/${imgFileName}`}
                alt="Preview"
                style={{ width: 100, height: 100, objectFit: "cover", marginTop: 10 }}
              />
            )}
          </Form.Item>

          <Form.Item
            name="ngoId"
            label="NGO"
            rules={[{ required: true, message: "Vui lòng chọn NGO" }]}
          >
            <Select
              placeholder="Chọn NGO"
              options={ngos.map((ngo) => ({
                label: ngo.name, // Hiển thị tên NGO
                value: ngo.id,   // Lưu ID của NGO
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProgram;
