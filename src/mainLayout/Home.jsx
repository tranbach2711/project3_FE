// src/pages/Home.js
import React from "react";
import Ngo from "../components/Ngo";  // Đổi từ ProductCarousel thành Ngo
import '../index.css';
import Team from '../components/Team';
import Program from "../components/Program";

const Home = () => {
   

    return (
        <div>
            <Program />
            <Ngo />
            <Team />
        </div>
    );
};

export default Home;
