import { createContext, useContext, useState, useEffect } from 'react';
import hocPhanService from '../services/HocPhanService';
import giangVienService from '../services/giangVienService';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [listHocPhan, setListHocPhan] = useState([]);
  const [listGiangVien, setListGiangVien] = useState([]);

  const exportValues = {
    listHocPhan,
    setListHocPhan,
    listGiangVien,
    setListGiangVien,
  };

  useEffect(() => {
    (async () => {
      await fetchHocPhanData();
      await fetchGiangVienData();
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

  return <AppContext.Provider value={exportValues}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
