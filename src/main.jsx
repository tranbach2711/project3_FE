import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './index.css'
import routes from './Routes';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
