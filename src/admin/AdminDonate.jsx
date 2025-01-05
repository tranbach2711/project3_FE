import React, { useEffect, useState } from "react";
import { Table, Input, notification } from "antd";
import axios from "axios";

const { Search } = Input;

const AdminDonate = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Fetch donations from API
  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5169/GetAllDonation");
      setDonations(response.data);
      setFilteredDonations(response.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to fetch donation data.",
      });
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = donations.filter(
      (donation) =>
        donation.userId.toString().includes(value) ||
        donation.accNumber.includes(value)
    );
    setFilteredDonations(filtered);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1, // Auto-increment index
    },
    {
      title: "ID Chương trình",
      dataIndex: "programId",
      key: "programId",
    },
    {
      title: "ID Nguyên nhân",
      dataIndex: "causeId",
      key: "causeId",
    },
    {
      title: "ID Người dùng",
      dataIndex: "userId",
      key: "userId",
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
        placeholder="Tìm kiếm theo ID người dùng hoặc số tài khoản"
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
