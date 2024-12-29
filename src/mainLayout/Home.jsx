// src/pages/Home.js
import React from "react";
import Ngo from "../components/Ngo";  // Đổi từ ProductCarousel thành Ngo
import '../index.css';
import Team from '../components/Team';
import Program from "../components/Program";

const Home = () => {
    const products = [
        { id: 1, name: 'Product 1', color: 'Red', price: '$19.99', imageSrc: 'https://via.placeholder.com/200', imageAlt: 'Product 1 Image', href: '#' },
        { id: 2, name: 'Product 2', color: 'Blue', price: '$29.99', imageSrc: 'https://via.placeholder.com/200', imageAlt: 'Product 2 Image', href: '#' },
        { id: 3, name: 'Product 3', color: 'Green', price: '$39.99', imageSrc: 'https://via.placeholder.com/200', imageAlt: 'Product 3 Image', href: '#' },
        { id: 4, name: 'Product 4', color: 'Yellow', price: '$49.99', imageSrc: 'https://via.placeholder.com/200', imageAlt: 'Product 4 Image', href: '#' },
        { id: 5, name: 'Product 5', color: 'Purple', price: '$59.99', imageSrc: 'https://via.placeholder.com/200', imageAlt: 'Product 5 Image', href: '#' },
        { id: 6, name: 'Product 6', color: 'Orange', price: '$69.99', imageSrc: 'https://via.placeholder.com/200', imageAlt: 'Product 6 Image', href: '#' },
        // Add more products as needed
    ];

    return (
        <div>
            <Program />
            <Ngo products={products} itemsPerPage={4} />
            <Team />
        </div>
    );
};

export default Home;
