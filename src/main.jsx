import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import HocPhanPage from "./pages/HocPhan/HocPhanPage";
import DeCuongPage from "./pages/DeCuongChiTiet/DeCuongPage";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hoc-phan" element={<HocPhanPage />} />
          <Route path="/de-cuong-chi-tiet" element={<DeCuongPage />} />
        </Route>
      </Routes>
  </BrowserRouter>
);
