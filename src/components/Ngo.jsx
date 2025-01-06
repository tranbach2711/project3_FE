import { useState, useEffect } from "react";
import axios from "axios"; // Import axios để gọi API

const Ngo = ({ itemsPerPage = 3 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayProducts, setDisplayProducts] = useState([]);

    // Lấy dữ liệu sản phẩm từ API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5169/GetNgo"); // Gọi API
                setDisplayProducts(response.data); // Cập nhật state với dữ liệu nhận được từ API
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProducts(); // Gọi API khi component được render lần đầu
    }, []);

    // Tự động cuộn mỗi 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(displayProducts.length / itemsPerPage));
        }, 2000); // Mỗi 2 giây chuyển slide

        return () => clearInterval(interval);
    }, [displayProducts, itemsPerPage]);

    const getCurrentSlideItems = () => {
        const start = currentIndex * itemsPerPage;
        const end = start + itemsPerPage;
        return displayProducts.slice(start, end);
    };

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
                    {getCurrentSlideItems().map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="w-1/3 px-2 flex-shrink-0"
                        >
                            <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Card Image */}
                                <div className="bg-gray-100 h-48">
                                    {/* Nếu có ảnh, bạn có thể thêm ở đây */}
                                </div>
                                
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{product.address}</p>
                                    <p className="mt-1 text-sm text-gray-500">{product.phone}</p>
                                    <p className="mt-1 text-sm text-gray-500">{product.email}</p>
                                    <a
                                        href={product.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 text-sm text-blue-500 hover:underline"
                                    >
                                        Visit Website
                                    </a>
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
