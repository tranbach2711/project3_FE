// src/pages/Home.js
import React from "react";
import Ngo from "../components/Ngo";  // Đổi từ ProductCarousel thành Ngo
import '../index.css';

const Home = () => {
    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 2,
            name: 'Modern Jacket',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg',
            imageAlt: "Front of men's Modern Jacket in blue.",
            price: '$120',
            color: 'Blue',
        },
        {
            id: 3,
            name: 'Casual Sneakers',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg',
            imageAlt: "Pair of casual sneakers in white.",
            price: '$85',
            color: 'White',
        },
        {
            id: 4,
            name: 'Wool Hat',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg',
            imageAlt: "Front of wool hat in grey.",
            price: '$25',
            color: 'Grey',
        },
        {
            id: 5,
            name: 'Denim Jeans',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of denim jeans in dark blue.",
            price: '$50',
            color: 'Dark Blue',
        },
        {
            id: 6,
            name: 'Leather Belt',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg',
            imageAlt: "Front of leather belt in brown.",
            price: '$45',
            color: 'Brown',
        },
        {
            id: 7,
            name: 'Classic Watch',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg',
            imageAlt: "Classic watch with leather strap.",
            price: '$150',
            color: 'Black',
        },
        {
            id: 8,
            name: 'Sunglasses',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg',
            imageAlt: "Pair of sunglasses with black frames.",
            price: '$60',
            color: 'Black',
        },
    ];

    return (
        <div>
            <Ngo products={products} />
        </div>
    );
};

export default Home;
