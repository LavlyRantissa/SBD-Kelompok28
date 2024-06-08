import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatList from './components/Card';
import AddPage from './pages/AddCatto';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<CatList />} />
        </>
      </Routes>
    </BrowserRouter>
  )
}