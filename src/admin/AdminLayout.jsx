import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import { PieChartOutlined, PayCircleOutlined, TruckOutlined } from '@ant-design/icons';


const items = [
  { label: 'Tổng quan', key: '1', icon: <PieChartOutlined /> },
  { label: 'Quản lý sản phẩm', key: '2', icon: <PayCircleOutlined /> },
  { label: 'Quản lý người dùng', key: '3', icon: <TruckOutlined /> },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    renderContent(e.key);
  };

  const renderContent = (key) => {
    switch (key) {
      case '1':
        navigate('/admin');
        break;
      case '2':
        navigate('/admin/program');
        break;
      case '3':
        navigate('/admin/ngo');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className="flex h-screen">
      <Sider collapsible breakpoint="lg">
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={["1"]}
        />
      </Sider>
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
