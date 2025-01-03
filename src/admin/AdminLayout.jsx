import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import { PieChartOutlined, PayCircleOutlined, TruckOutlined,TeamOutlined,FileTextOutlined,SmileOutlined } from '@ant-design/icons';


const items = [
    { label: 'Tổng quan', key: '1', icon: <PieChartOutlined /> },
    { label: 'Quản lý Program', key: '2', icon: <PayCircleOutlined /> },
    { label: 'Quản lý NGO', key: '3', icon: <TruckOutlined /> },
    { label: 'Quản lý Cause', key: '4', icon: <SmileOutlined /> },
    { label: 'Quản lý User', key: '5', icon: <TeamOutlined /> },
    { label: 'Xem lịch sử', key: '6', icon: <FileTextOutlined /> },
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
            case '4':
                navigate('/admin/cause');
                break;
            case '5':
                navigate('/admin/user');
            break;
            case '6':
                navigate('/admin/donate');
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
