import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Home from "./Home";


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* Trang Login */}
        <Route path="/home" element={<Home />} /> {/* Trang Home */}
      </Routes>
    </BrowserRouter>

    
  
  </StrictMode>,
 
)
