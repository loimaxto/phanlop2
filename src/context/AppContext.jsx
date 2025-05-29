import { createContext, useContext, useState, useEffect } from 'react';
import hocPhanService from '../services/HocPhanService';
import * as giangVienService from '../services/GiangVienService';
import KeHoachDayHocService from '../services/KeHoachDayHocService';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [listHocPhan, setListHocPhan] = useState([]);
  const [listGiangVien, setListGiangVien] = useState([]);
  const [listNhomKienThuc, setListNhomKienThuc] = useState([]);
  const [listKhoiKienThuc, setListKhoiKienThuc] = useState([]);
  // const [listNganh, setListNganh] = useState([]);

  const exportValues = {
    listHocPhan,
    setListHocPhan,
    listGiangVien,
    setListGiangVien,
    listNhomKienThuc,
    setListNhomKienThuc,
    listKhoiKienThuc,
    setListKhoiKienThuc,
  };

  useEffect(() => {
    (async () => {
      await fetchHocPhanData();
      await fetchGiangVienData();
      await fetchNhomKienThucData();
      await fetchKhoiKienThucData();
      // await fetchNganhData();
    })();
  }, []);

  const fetchHocPhanData = async () => {
    try {
      const hocPhanData = await hocPhanService.getAll();
      setListHocPhan(hocPhanData);
    } catch (error) {
      console.error('Error fetching hoc phan data:', error);
    }
  };

  const fetchGiangVienData = async () => {
    try {
      const giangVienData = await giangVienService.getAll();
      setListGiangVien(giangVienData);
    } catch (error) {
      console.error('Error fetching giang vien data:', error);
    }
  };

  const fetchNhomKienThucData = async () => {
    try {
      const nhomKienThucData = await KeHoachDayHocService.getAllNhomKienThuc();
      setListNhomKienThuc(nhomKienThucData);
    } catch (error) {
      console.error('Error fetching nhom kien thuc data:', error);
    }
  };

  const fetchKhoiKienThucData = async () => {
    try {
      const khoiKienThucData = await KeHoachDayHocService.getAllKhoiKienThuc();
      setListKhoiKienThuc(khoiKienThucData);
    } catch (error) {
      console.error('Error fetching khoi kien thuc data:', error);
    }
  };

  return <AppContext.Provider value={exportValues}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
