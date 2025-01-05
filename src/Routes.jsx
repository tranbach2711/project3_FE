import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import các layout và page components
import MainLayout from './mainLayout/MainLayout';
import Home from './mainLayout/Home';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Auth from './Auth/Auth';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProgram from './admin/AdminProgram';
import AdminNgo from './admin/AdminNgo';
import Contact from './components/Contact';
import About from './components/About';
import ProgramDetail from './components/ProgramDetail';
import Donate from './components/Donate';
import UserDetail from './components/UserDetail';
import AdminCause from './admin/AdminCause';
import AdminUser from './admin/AdminUser';
import AdminDonate from './admin/AdminDonate';

// import AdminLayout from './layouts/AdminLayout';
// import ProductPage from './pages/ProductPage';
// import CartPage from './pages/CartPage';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminProducts from './pages/admin/AdminProducts';
// import AdminOrders from './pages/admin/AdminOrders';
// import NotFoundPage from './pages/NotFoundPage';

// Định nghĩa routes
const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'programs/:id', element: <ProgramDetail /> },
            { path: 'donate/:programId', element: <Donate /> },
            {
                path: '/users/:id',
                element: <UserDetail />,
            },
            //   { path: 'products', element: <ProductPage /> },
            //   { path: 'cart', element: <CartPage /> },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { path: '', element: <AdminDashboard /> },
            { path: 'program', element: <AdminProgram /> },
            { path: 'ngo', element: <AdminNgo /> },
            { path: 'cause', element: <AdminCause /> },
            { path: 'user', element: <AdminUser /> },
            { path: 'donate', element: <AdminDonate /> },
        ],
    },
    //   { path: '*', element: <NotFoundPage /> }, // Trang 404
    {
        path: '/auth',
        element: <Auth />,
        children: [
            { path: '', element: <SignIn /> },
            { path: 'signup', element: <SignUp /> },
        ],
    },
    {
        path: '/Contact',
        element: <MainLayout />,
        children: [
            { path: '', element: <Contact /> },
            //   { path: 'products', element: <ProductPage /> },
            //   { path: 'cart', element: <CartPage /> },
        ],
    },
    {
        path: '/About',
        element: <MainLayout />,
        children: [
            { path: '', element: <About /> },
            //   { path: 'products', element: <ProductPage /> },
            //   { path: 'cart', element: <CartPage /> },
        ],
    },
    {
        path: '/programs/:id',
        element: <MainLayout />,
        children: [
            // { path: '', element: <SignIn /> },
            // { path: 'signup', element: <SignUp /> },
        ],
    },


]);

export default routes;
