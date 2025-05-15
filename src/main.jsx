import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import About from './pages/About';
import Home from './pages/Home';
import Layout from './components/Layout';
import HocPhanPage from './pages/HocPhan/HocPhanPage';
import DeCuongPage from './pages/DeCuongChiTiet/DeCuongPage';
import CurriculumPage from './pages/ChuongTrinhDaoTao/index';
import CreateCurriculumPage from './pages/ChuongTrinhDaoTao/CreateCurriculumPage';
import KeHoachDayHocPage from './pages/KeHoachDayHoc';
import KeHoachMoNhomPage from './pages/KeHoachMoNhom';
import CreateKeHoachMoNhom from './pages/KeHoachMoNhom/CreateKeHoachMoNhom';
import { AppProvider } from './context/AppContext';
import GiangVienPage from './pages/GiangVien/GiangVienPage';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hoc-phan" element={<HocPhanPage />} />
          <Route path="/de-cuong-chi-tiet" element={<DeCuongPage />} />
          <Route path="/ctdt" element={<CurriculumPage />} />
          <Route path="/create-ctdt" element={<CreateCurriculumPage />} />
          <Route path="/ke-hoach-day-hoc/:thongTinChungId" element={<KeHoachDayHocPage />} />
          <Route path="/ke-hoach-mo-nhom" element={<KeHoachMoNhomPage />} />
          <Route path="/ke-hoach-mo-nhom/create" element={<CreateKeHoachMoNhom />} />
          <Route path="/giang-vien" element={<GiangVienPage />} />
        </Route>
      </Routes>
    </AppProvider>
  </BrowserRouter>
);
