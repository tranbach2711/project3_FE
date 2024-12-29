import { useState, useEffect } from "react";

const Ngo = ({ products, itemsPerPage = 4 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayProducts, setDisplayProducts] = useState(products);

    // Tạo mảng sản phẩm nối tiếp để tạo hiệu ứng nối đuôi
    useEffect(() => {
        setDisplayProducts([...products, ...products]); // Nối sản phẩm để tạo hiệu ứng vô tận
    }, [products]);

    // Tính toán số trang
    const totalPages = Math.ceil(displayProducts.length / itemsPerPage);

    // Cập nhật sản phẩm hiển thị dựa trên currentIndex
    const productsToDisplay = displayProducts.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    // Tự động cuộn mỗi 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
        }, 2000); // Mỗi 2 giây chuyển sản phẩm

        return () => clearInterval(interval);
    }, [totalPages]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    {/* Centered "NGO" text */}
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                        NGO
                    </h2>

                    {/* Products grid */}
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {productsToDisplay.map((product) => (
                            <div key={product.id} className="group relative">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
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
                        ))}
                    </div>

                    {/* Pagination Controls - Dots */}
                    <div className="mt-6 flex justify-center space-x-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Ngo;
