import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import HocPhanPage from "./pages/HocPhan/HocPhanPage";
import DeCuongPage from "./pages/DeCuongChiTiet/DeCuongPage";
import CurriculumPage from "./pages/ChuongTrinhDaoTao/CurriculumPage";
import CreateCurriculumPage from "./pages/ChuongTrinhDaoTao/CreateCurriculumPage";
import KeHoachDayHocPage from "./pages/KeHoachDayHoc/KeHoachDayHocPage";
import KeHoachGiangDayPage from "./pages/KeHoachGiangDay/KeHoachGiangDayPage";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/hoc-phan" element={<HocPhanPage />} />
                <Route path="/de-cuong-chi-tiet" element={<DeCuongPage />} />
                <Route path="/ctdt" element={<CurriculumPage />} />
                <Route path="/create-ctdt" element={<CreateCurriculumPage />} />
                <Route
                    path="/ke-hoach-day-hoc"
                    element={<KeHoachDayHocPage />}
                />
                <Route
                    path="/ke-hoach-giang-day"
                    element={<KeHoachGiangDayPage />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);
