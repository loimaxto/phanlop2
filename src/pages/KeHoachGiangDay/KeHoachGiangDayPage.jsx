'use client';

import React, { useState, useEffect } from 'react';
import { keHoachGiangDayData, phanCongGiangDayData } from '../../dumpData';
import AddKeHoachModal from './AddKeHoachModal';
import EditKeHoachModal from './EditKeHoachModal';
import AddPhanCongModal from './AddPhanCongModal';
import EditPhanCongModal from './EditPhanCongModal';

const KeHoachGiangDayPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhanCong, setSelectedPhanCong] = useState(null);
  const [selectedKeHoach, setSelectedKeHoach] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // add, edit, addPhanCong, editPhanCong
  const [selectedHocKy, setSelectedHocKy] = useState('1');
  const [selectedNamHoc, setSelectedNamHoc] = useState('');
  const [needRefresh, setNeedRefresh] = useState(true);
  // Dữ liệu mẫu cho kế hoạch giảng dạy
  const [keHoachData, setKeHoachData] = useState(keHoachGiangDayData);

  // khoi tao combobox năm học
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedNamHoc(currentYear);
  }, []);

  // Lấy dữ liệu kế hoạch giảng dạy từ dumpData.js
  // Fake backend
  useEffect(() => {
    if (needRefresh) {
      keHoachGiangDayData;
      setNeedRefresh(false);
      setKeHoachData(keHoachGiangDayData);
    }
  }, [needRefresh]);

  //Fake backend
  useEffect(() => {
    let newKeHoachData = keHoachGiangDayData.filter(keHoach => {
      return keHoach.hocKy == selectedHocKy && keHoach.namHoc == selectedNamHoc;
    });
    setKeHoachData(newKeHoachData);
  }, [selectedHocKy, selectedNamHoc]);

  const openAddKeHoachModal = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  // Xử lý xóa, ok
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kế hoạch này?')) {
      //fake backend
      keHoachData.splice(
        keHoachData.findIndex(item => item.id == id),
        1
      );
      setNeedRefresh(true);
    }
  };

  // Xử lý xóa phân công
  const handleDeletePhanCong = (keHoachId, phanCongId) => {
    ({ keHoachId, phanCongId });
    if (window.confirm('Bạn có chắc chắn muốn xóa phân công này?')) {
      let keHoachData = keHoachGiangDayData.find(item => item.id == keHoachId);
      if (keHoachData) {
        let keHoachPhanCongIndex = keHoachData.phanCong.findIndex(item => item.id == phanCongId);
        let phanCongIndex = phanCongGiangDayData.findIndex(item => item.id == phanCongId);
        phanCongGiangDayData.find(item => item.id == phanCongId);
        if (keHoachPhanCongIndex !== -1 && phanCongIndex !== -1) {
          keHoachData.phanCong.splice(keHoachPhanCongIndex, 1);
          phanCongGiangDayData.splice(phanCongIndex, 1);
          setNeedRefresh(true);
        }
      }
    }
  };

  const getCurrentAndNextYear = () => {
    const currentYear = new Date().getFullYear();
    return [`${currentYear - 1}`, `${currentYear}`, `${currentYear + 1}`];
  };

  // Đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Kế hoạch mở nhóm & Phân công giảng dạy</h1>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <label className="font-medium">Học kỳ:</label>
              <select
                value={selectedHocKy}
                onChange={e => setSelectedHocKy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">HK1</option>
                <option value="2">HK2</option>
                <option value="3">HK3</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium">Năm học:</label>
              <select
                value={selectedNamHoc}
                onChange={e => setSelectedNamHoc(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getCurrentAndNextYear().map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={openAddKeHoachModal}
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
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                <th className="p-2 border text-center" rowSpan="2">
                  Nhóm
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Mã CBGD
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Họ và tên CBGD
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Số tiết thực hiện
                </th>
                <th className="p-2 border text-center" rowSpan="2">
                  Số tiết thực tế
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
              </tr>
            </thead>
            <tbody>
              {keHoachData.map((keHoach, keHoachIndex) => {
                const rowSpan = keHoach.phanCong.length || 1;
                return (
                  <React.Fragment key={keHoach.id}>
                    <tr>
                      <td colSpan={18} className="p-2 border text-center">
                        <div className="flex justify-end items-center space-x-2 ml-2">
                          <div className="flex rounded-lg p-1 ">
                            <button
                              onClick={() => {
                                setSelectedKeHoach(keHoach);
                                setModalMode('edit');
                                setIsModalOpen(true);
                              }}
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
                              onClick={() => handleDelete(keHoach.id)}
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
                              onClick={() => {
                                setSelectedKeHoach(keHoach);
                                setModalMode('addPhanCong');
                                setIsModalOpen(true);
                              }}
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
                    {keHoach.phanCong.length > 0 ? (
                      keHoach.phanCong.map((phanCong, phanCongIndex) => (
                        <tr key={`${keHoach.id}-${phanCongIndex}`} className="hover:bg-gray-50">
                          {phanCongIndex === 0 && (
                            <>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoachIndex + 1}
                              </td>
                              <td className="p-2 border" rowSpan={rowSpan}>
                                {keHoach.hocPhan.maHP}
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
                                {keHoach.hocPhan.soTietThucTap}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.hocPhan.soTietThucHanh}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.hocPhan.soTietTong}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.heSoHP.toFixed(2)}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.tongSoNhom}
                              </td>
                              <td className="p-2 border text-center" rowSpan={rowSpan}>
                                {keHoach.slsvNhom}
                              </td>
                            </>
                          )}
                          <td className="p-2 border text-center">{phanCong.nhom}</td>
                          <td className="p-2 border text-center">{phanCong.maCBGD}</td>
                          <td className="p-2 border">{phanCong.tenCBGD}</td>
                          <td className="p-2 border text-center">{phanCong.soTietThucHien}</td>
                          <td className="p-2 border text-center">{phanCong.soTietThucTe}</td>
                          <td className="p-2 border">
                            <div className="flex justify-center space-x-1">
                              <button
                                onClick={() => {
                                  setSelectedKeHoach(keHoach);
                                  setSelectedPhanCong(phanCong);
                                  setModalMode('editPhanCong');
                                  setIsModalOpen(true);
                                }}
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
                                onClick={() => handleDeletePhanCong(keHoach.id, phanCong.id)}
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
                        <td className="p-2 border">{keHoach.hocPhan.maHP}</td>
                        <td className="p-2 border">{keHoach.hocPhan.tenHocPhan}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTinChi}</td>
                        <td className="p-2 border">{keHoach.khoa}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietLyThuyet}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietThucTap}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietThucHanh}</td>
                        <td className="p-2 border text-center">{keHoach.hocPhan.soTietTong}</td>
                        <td className="p-2 border text-center">{keHoach.heSoHP.toFixed(2)}</td>
                        <td className="p-2 border text-center">{keHoach.tongSoNhom}</td>
                        <td className="p-2 border text-center">{keHoach.slsvNhom}</td>
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

      {/* Sử dụng các modal component */}
      <AddKeHoachModal
        isOpen={isModalOpen && modalMode === 'add'}
        onClose={handleCloseModal}
        refresh={() => setNeedRefresh(true)}
      />

      <EditKeHoachModal
        isOpen={isModalOpen && modalMode === 'edit'}
        onClose={handleCloseModal}
        keHoach={selectedKeHoach}
        refresh={() => setNeedRefresh(true)}
      />

      <AddPhanCongModal
        isOpen={isModalOpen && modalMode === 'addPhanCong'}
        onClose={handleCloseModal}
        keHoach={selectedKeHoach}
        refresh={() => setNeedRefresh(true)}
      />

      <EditPhanCongModal
        isOpen={isModalOpen && modalMode === 'editPhanCong'}
        onClose={handleCloseModal}
        keHoach={selectedKeHoach}
        phanCong={selectedPhanCong}
        setPhanCong={setSelectedPhanCong}
        refresh={() => setNeedRefresh(true)}
      />
    </div>
  );
};

export default KeHoachGiangDayPage;
