'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { keHoachMoNhomData } from '../../dumpData';
import EditKeHoachModal from './EditKeHoachModal';
import AddPhanCongModal from './AddPhanCongModal';
import EditPhanCongModal from './EditPhanCongModal';
import KeHoachMoNhomService from '../../services/KeHoachMoNhomService';
import { printKeHoachMoNhom, printKeHoachMoNhomTongHop } from '../../services/print-service';
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';

const KeHoachGiangDayPage = () => {
  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    mode: 'add',
    keHoachMoNhom: null,
    phanCong: null,
  });

  // State for search and data
  const [selectedNamHoc, setSelectedNamHoc] = useState('');
  const [keyword, setKeyword] = useState('');
  const [needRefresh, setNeedRefresh] = useState(true);
  const [keHoachData, setKeHoachData] = useState(keHoachMoNhomData);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);

  // Initialize academic year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedNamHoc(`${currentYear - 1}-${currentYear}`);
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (keyword, namHoc) => {
      try {
        const data = await KeHoachMoNhomService.searchKeHoachMoNhom(keyword, namHoc);
        setKeHoachData(data);
      } catch (error) {
        toast.error('Lỗi khi tìm kiếm kế hoạch mở nhóm');
      }
    }, 500),
    []
  );

  // Fetch data when keyword, namHoc, or needRefresh changes
  useEffect(() => {
    if (selectedNamHoc) {
      debouncedSearch(keyword, selectedNamHoc);
      if (needRefresh) {
        setNeedRefresh(false);
      }
    }
  }, [keyword, selectedNamHoc, needRefresh, debouncedSearch]);

  // Handle delete ke hoach
  const handleDeleteKeHoachMoNhom = index => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kế hoạch mở nhóm này?')) {
      (async () => {
        let keHoach = keHoachData[index];
        let response = await KeHoachMoNhomService.deleteKeHoachMoNhom(keHoach.id);
        if (response) {
          toast.success('Xóa kế hoạch mở nhóm thành công');
          setKeHoachData(prev => prev.filter((_, i) => i !== index));
        }
      })();
    }
  };

  // Handle delete phan cong
  const handleDeletePhanCong = (keHoachIndex, phanCongIndex) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phân công này?')) {
      (async () => {
        let keHoach = keHoachData[keHoachIndex];
        let phanCong = keHoach.phanCongGiangDay[phanCongIndex];
        let response = await KeHoachMoNhomService.deletePhanCong(phanCong.id);
        if (response) {
          toast.success('Xóa phân công thành công');
          setKeHoachData(prev => {
            let newKeHoachData = [...prev];
            newKeHoachData[keHoachIndex].phanCongGiangDay = newKeHoachData[
              keHoachIndex
            ].phanCongGiangDay.filter((_, i) => i !== phanCongIndex);
            return newKeHoachData;
          });
        }
      })();
    }
  };

  // Handle edit ke hoach
  const handleClickEditKeHoach = keHoachIndex => {
    setModal({
      isOpen: true,
      mode: 'edit',
      keHoachMoNhom: keHoachData[keHoachIndex],
    });
  };

  // Handle add phan cong
  const handleClickThemPhanCong = keHoachIndex => {
    setModal({
      isOpen: true,
      mode: 'addPhanCong',
      keHoachMoNhom: keHoachData[keHoachIndex],
    });
  };

  // Handle edit phan cong
  const handleClickEditPhanCong = (keHoachIndex, phanCongIndex) => {
    setModal({
      isOpen: true,
      mode: 'editPhanCong',
      keHoachMoNhom: keHoachData[keHoachIndex],
      phanCong: keHoachData[keHoachIndex].phanCongGiangDay[phanCongIndex],
    });
  };

  // Get academic year options
  const getOptionsNamHoc = () => {
    const currentYear = new Date().getFullYear();
    const namHocOptions = [];
    for (let i = currentYear - 3; i <= currentYear + 1; i++) {
      namHocOptions.push(`${i}-${i + 1}`);
    }
    return namHocOptions;
  };

  // Close modal
  const handleCloseModal = () => {
    setModal({
      isOpen: false,
      mode: 'add',
      keHoachMoNhom: null,
      phanCong: null,
    });
  };

  // Save modal and refresh
  const handleSaveModal = () => {
    setNeedRefresh(true);
    handleCloseModal();
  };

  // Handle print ke hoach tong hop
  const handlePrintKeHoachMoNhomTongHop = async () => {
    const response = await KeHoachMoNhomService.getTongHopKeHoachMoNhom(selectedNamHoc);
    if (response) {
      printKeHoachMoNhomTongHop(response, selectedNamHoc);
      toast.success('In kế hoạch mở nhóm tổng hợp thành công');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Kế hoạch mở nhóm & Phân công giảng dạy</h1>
          <div className="flex space-x-4 items-center">
            <NavLink
              to="/ke-hoach-mo-nhom/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Thêm kế hoạch
            </NavLink>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã hoặc tên học phần..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="font-medium">Năm học:</label>
            <select
              value={selectedNamHoc}
              onChange={e => setSelectedNamHoc(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {getOptionsNamHoc().map(namHoc => (
                <option key={namHoc} value={namHoc}>
                  {namHoc}
                </option>
              ))}
            </select>
            <div className="relative inline-block text-left">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
                onClick={() => setIsPrintMenuOpen(!isPrintMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                  />
                </svg>
                <span className="ml-2">In</span>
              </button>
              {isPrintMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setIsPrintMenuOpen(false);
                      printKeHoachMoNhom(keHoachData);
                    }}
                  >
                    In kế hoạch
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setIsPrintMenuOpen(false);
                      handlePrintKeHoachMoNhomTongHop();
                    }}
                  >
                    In tổng hợp
                  </button>
                </div>
              )}
            </div>
          </div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border text-center" rowSpan="2">
                  STT
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Mã HP
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Tên học phần
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Số TC
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Khoa
                </th>
                <th className="p-2 border text-center" colSpan="4">
                  Số tiết
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Hệ số HP
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Tổng Số nhóm
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  SLSV/ Nhóm
                </th>
                <th className="p-2 border text-center" colSpan="5">
                  Phân công giảng dạy
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Thao tác
                </th>
              </tr>
              <tr className="bg-gray-100">
                <th className="p-2 border text-center">LT</th>
                <th className="p-2 border text-center">TT</th>
                <th className="p-2 border text-center">TH</th>
                <th className="p-2 border text-center">TC</th>
                <th className="p-2 border text-center" colSpan="1" rowSpan="1">
                  Nhóm
                </th>
                <th className="p-2 border text-center" colSpan="1" rowSpan="1">
                  Mã CBGD
                </th>
                <th className="p-2 border text-center" rowSpan="1">
                  Họ và tên CBGD
                </th>
                <th className="p-2 border text-center" rowSpan="1">
                  Số tiết thực hiện
                </th>
                <th className="p-2 border text-center" rowSpan="1">
                  Số tiết thực tế
                </th>
              </tr>
            </thead>
            <tbody>
              {keHoachData.map((keHoach, keHoachIndex) => {
                const rowSpan = keHoach.phanCongGiangDay.length || 1;
                return (
                  <React.Fragment key={keHoach.id}>
                    <tr>
                      <td colSpan={18} className="p-2 border text-center">
                        <div className="flex justify-end items-center space-x-2 ml-2">
                          <div className="flex rounded-lg p-1 ">
                            <button
                              onClick={() => handleClickEditKeHoach(keHoachIndex)}
                              className="p-1 rounded-l-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                              title="Sửa kế hoạch"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteKeHoachMoNhom(keHoachIndex)}
                              className="p-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                              title="Xóa kế hoạch"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleClickThemPhanCong(keHoachIndex)}
                              className="p-1 rounded-r-md bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
                              title="Thêm phân công"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {keHoach.phanCongGiangDay.length > 0 ? (
                      keHoach.phanCongGiangDay.map((phanCong, phanCongIndex) => (
                        <tr key={`${keHoach.id}-${phanCongIndex}`} className="hover:bg-gray-50">
                          {phanCongIndex === 0 && (
                            <>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoachIndex + 1}
                              </td>
                              <td className="p-2 border" rowSpan={rowSpan}>
                                {keHoach.hocPhan.maHocPhan}
                              </td>
                              <td className="p-2 border" rowSpan={rowSpan}>
                                {keHoach.hocPhan.tenHocPhan}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.hocPhan.soTinChi}
                              </td>
                              <td className="p-2 border" rowSpan={rowSpan}>
                                {keHoach.khoa}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.hocPhan.soTietLyThuyet}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.hocPhan.soTietBaiTap}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.hocPhan.soTietThucHanh}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.hocPhan.soTietTongCong}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.heSo.toFixed(2)}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.tongSoNhom}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.soSinhVien1Nhom}
                              </td>
                            </>
                          )}
                          <td className="p-2 border text-center">{phanCong.nhom}</td>
                          <td className="p-2 border text-center">{phanCong.giangVien.id}</td>
                          <td className="p-2 border">{phanCong.giangVien.ten}</td>
                          <td className="p-2 border text-center">{phanCong.soTietThucHien}</td>
                          <td className="p-2 border text-center">{phanCong.soTietThucTe}</td>
                          <td className="p-2 border">
                            <div className="flex justify-center space-x-1">
                              <button
                                onClick={() => handleClickEditPhanCong(keHoachIndex, phanCongIndex)}
                                className="p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                title="Sửa phân công"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeletePhanCong(keHoachIndex, phanCongIndex)}
                                className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                                title="Xóa phân công"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-50">
                        <td className="p-2 border text-center">{keHoachIndex + 1}</td>
                        <td className="p-2 border">{keHoach.hocPhan.maHocPhan}</td>
                        <td className="p-2 border">{keHoach.hocPhan.tenHocPhan}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTinChi}</td>
                        <td className="p-2 border">{keHoach.khoa}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietLyThuyet}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietBaiTap}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietThucHanh}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietTongCong}</td>
                        <td className="p-2 border text-center">{keHoach.heSo.toFixed(2)}</td>
                        <td className="p-2 border text-center">{keHoach.tongSoNhom}</td>
                        <td className="p-2 border text-center">{keHoach.soSinhVien1Nhom}</td>
                        <td className="p-2 border text-center" colSpan="6"></td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EditKeHoachModal
        isOpen={modal.isOpen && modal.mode == 'edit'}
        keHoachMoNhom={modal.keHoachMoNhom}
        onSave={handleSaveModal}
        onClose={handleCloseModal}
      />

      <AddPhanCongModal
        isOpen={modal.isOpen && modal.mode == 'addPhanCong'}
        keHoachMoNhom={modal.keHoachMoNhom}
        onSave={handleSaveModal}
        onClose={handleCloseModal}
      />

      <EditPhanCongModal
        isOpen={modal.isOpen && modal.mode == 'editPhanCong'}
        keHoachMoNhom={modal.keHoachMoNhom}
        phanCong={modal.phanCong}
        onSave={handleSaveModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default KeHoachGiangDayPage;
