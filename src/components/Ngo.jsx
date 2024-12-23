// src/components/Ngo.js
import { useState, useEffect } from "react";

const Ngo = ({ products, itemsPerPage = 4 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayProducts, setDisplayProducts] = useState(products);

    // Tạo mảng sản phẩm nối tiếp để tạo hiệu ứng nối đuôi
    useEffect(() => {
        setDisplayProducts([...products, ...products]); // Nối sản phẩm để tạo hiệu ứng vô tận
    }, [products]);

    // Tự động cuộn mỗi 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (displayProducts.length - itemsPerPage + 1));
        }, 2000); // Mỗi 2 giây chuyển sản phẩm

        return () => clearInterval(interval);
    }, [displayProducts, itemsPerPage]);

    return (
        <div className="mt-6">
            {/* Container với padding và full-width trên mobile */}
            <div className="overflow-hidden relative w-full px-4 sm:px-[2cm]">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                    }}
                >
                    {displayProducts.map((product) => (
                        <div
                            key={product.id}
                            className="w-1/4 px-2 flex-shrink-0"
                        >
                            <div className="group relative">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="w-full h-full object-cover rounded-md bg-gray-200 group-hover:opacity-75"
                                />
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Controls - Dots */}
            <div className="mt-4 flex justify-center space-x-2">
                {[...Array(Math.ceil(displayProducts.length / itemsPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full bg-gray-300 ${currentIndex === index ? "bg-gray-900" : "hover:bg-gray-400"}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Ngo;
