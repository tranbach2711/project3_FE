import React, { useEffect, useState } from "react";
import { Table, Input, notification } from "antd";
import axios from "axios";

const { Search } = Input;

const AdminDonate = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [causes, setCauses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
      setFilteredDonations(donationRes.data);
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

  // Handle search by username or account number
  const handleSearch = (value) => {
    setSearchValue(value);

    // Find userIds that match the search value (case-insensitive)
    const filteredUsers = users.filter((user) =>
      user.userName.toLowerCase().includes(value.toLowerCase())
    );

    // Get the ids of users that match the search value
    const filteredUserIds = filteredUsers.map((user) => user.id);

    // Filter donations by matching userId or account number
    const filtered = donations.filter(
      (donation) =>
        filteredUserIds.includes(donation.userId) || // Check if userId matches
        donation.accNumber.includes(value) // Check if account number matches
    );

    setFilteredDonations(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <Search
        placeholder="Tìm kiếm theo tên người dùng hoặc số tài khoản"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchValue}
        style={{ marginBottom: 20, width: 400 }}
      />
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

export default AdminDonate;
