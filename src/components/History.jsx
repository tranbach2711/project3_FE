import React, { useEffect, useState } from "react";
import { Table, notification } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const History = () => {
  const { userIdParam } = useParams();  // Lấy userId từ URL
  const [donations, setDonations] = useState([]);
  const [causes, setCauses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(userIdParam); // Kiểm tra giá trị userIdParam
    fetchData();
  }, [userIdParam]);
  // Fetch data from APIs
  const fetchData = async () => {
    try {
      const [donationRes, causeRes, programRes, userRes] = await Promise.all([
        axios.get("http://localhost:5169/GetAllDonation"),
        axios.get("http://localhost:5169/GetCause"),
        axios.get("http://localhost:5169/GetProgram"),
        axios.get("http://localhost:5169/api/User"), // API giả định cho user
      ]);

      setDonations(donationRes.data);
      setCauses(causeRes.data);
      setPrograms(programRes.data);
      setUsers(userRes.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to fetch data.",
      });
    }
  };

  // Map IDs to Names
  const getNameById = (id, data, key) => {
    const item = data.find((d) => d.id === id);
    return item ? item[key] : "Không xác định";
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lọc donations theo userId lấy từ URL
  const filteredDonations = donations.filter(donation => donation.userId === parseInt(userIdParam));

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Chương trình",
      dataIndex: "programId",
      key: "programName",
      render: (programId) => getNameById(programId, programs, "programName"),
    },
    {
      title: "Nguyên nhân",
      dataIndex: "causeId",
      key: "causeName",
      render: (causeId) => getNameById(causeId, causes, "causeName"),
    },
    {
      title: "Người dùng",
      dataIndex: "userId",
      key: "userName",
      render: (userId) => getNameById(userId, users, "userName"),
    },
    {
      title: "Số tiền quyên góp",
      dataIndex: "donationAmount",
      key: "donationAmount",
      render: (amount) => `${amount.toLocaleString()} VND`,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Số tài khoản",
      dataIndex: "accNumber",
      key: "accNumber",
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-10 mb-5">
        Quản lý lịch sử quyên góp
      </h2>
      <Table
        columns={columns}
        dataSource={filteredDonations.map((item) => ({
          ...item,
          key: item.id,
        }))}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default History;
