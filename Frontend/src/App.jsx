import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatList from './pages/CatList';
import AddPage from './pages/AddCatt';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/cats" element={<CatList />}/>
          <Route path="/cats/addcat" element={<AddPage />}/>
        </>
      </Routes>
    </BrowserRouter>
  )
}