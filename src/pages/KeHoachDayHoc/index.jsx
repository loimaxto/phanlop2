'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import printService from '../../services/print-service';
import AddKeHoachDayHocModal from './AddKeHoachDayHocModal';
import EditKeHoachDayHocModal from './EditKeHoachDayHocModal';
import { useParams } from 'react-router';
import KeHoachDayHocService from '../../services/KeHoachDayHocService';
import AddKhoiKienThucModal from './AddKhoiKienThucModal';
import EditKhoiKienThucModal from './EditKhoiKienThucModal';
import ThemNhomKienThucModal from './ThemNhomKienThucModal';
import SuaNhomKienThucModal from './SuaNhomKienThucModal';
import { integerToRoman } from '../../services/helpers';

const KeHoachDayHocPage = () => {
  const { thongTinChungId } = useParams();
  const [nganh, setNganh] = useState({ name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    mode: '',
    item: null,
  });
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [expandedKhoi, setExpandedKhoi] = useState({});
  const [expandedNhom, setExpandedNhom] = useState({});
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(true);
  const [keHoachData, setKeHoachData] = useState([]);
  const [nhomKienThucData, setNhomKienThucData] = useState([]);
  const [khoiKienThucData, setKhoiKienThucData] = useState([]);
  const [selectedHocKy, setSelectedHocKy] = useState('all');

  const colors = 'blue, red, green'.split(',').map(color => `bg-${color.trim()}-50`);

  // Fetch ngành and initialize data
  useEffect(() => {
    if (needRefresh && thongTinChungId) {
      (async () => {
        const nganhData = await KeHoachDayHocService.getChiTietThongTinChungById(thongTinChungId);
        if (nganhData) {
          setNganh({ name: nganhData.tenNganh || 'Demo' });
          // Flatten keHoachData, nhomKienThucData, and khoiKienThucData from API response
          const flattenedKeHoach = [];
          const flattenedNhomKienThuc = [];
          const flattenedKhoiKienThuc = [];
          nganhData.listKhoiKienThuc.forEach((khoi, khoiIndex) => {
            flattenedKhoiKienThuc.push({
              id: khoi.id,
              name: khoi.name,
            });
            khoi.listNhomKienThuc.forEach((nhom, nhomIndex) => {
              flattenedNhomKienThuc.push({
                id: nhom.id,
                khoiKienThucId: nhom.khoiKienThucId,
                tenNhom: nhom.tenNhom,
                maNhom: nhom.maNhom,
                soTinChiTuChonToiThieu: nhom.soTinChiTuChonToiThieu,
                tichLuy: nhom.tichLuy,
              });
              nhom.listKeHoachDayHoc.forEach((keHoach, keHoachIndex) => {
                flattenedKeHoach.push({
                  id: keHoach.id,
                  hocPhanId: keHoach.hocPhanId,
                  maHP: keHoach.maHocPhan,
                  tenHocPhan: keHoach.tenHocPhan,
                  soTinChi: keHoach.soTinChi,
                  hocKi: keHoach.hocKi,
                  maHocPhanTruoc: keHoach.maHocPhanTruoc || '',
                  nhomKienThucId: nhom.id,
                  khoiKienThucId: khoi.id,
                  batBuoc: keHoach.batBuoc,
                });
              });
            });
          });
          setKeHoachData(flattenedKeHoach);
          setNhomKienThucData(flattenedNhomKienThuc);
          setKhoiKienThucData(flattenedKhoiKienThuc);
        }
        setNeedRefresh(false);
      })();
    }
  }, [needRefresh, thongTinChungId]);

  // Initialize expanded states for khoi and nhom
  useEffect(() => {
    const initialExpandedKhoi = {};
    khoiKienThucData.forEach(khoi => {
      initialExpandedKhoi[khoi.id] = true;
    });
    setExpandedKhoi(initialExpandedKhoi);

    const initialExpandedNhom = {};
    nhomKienThucData.forEach(nhom => {
      initialExpandedNhom[nhom.id] = true;
    });
    setExpandedNhom(initialExpandedNhom);
  }, [khoiKienThucData, nhomKienThucData]);

  // Get group color
  const getGroupColor = num => {
    return colors[num % colors.length];
  };

  // Filter data based on search term and selected group
  const filteredData = keHoachData.filter(item => {
    const matchesSearch =
      item.maHP.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenHocPhan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGroup = selectedGroup === 'all' || item.nhomKienThucId == selectedGroup;
    const matchesHocKy = selectedHocKy === 'all' || item.hocKi.includes(Number(selectedHocKy));

    return matchesSearch && matchesGroup && matchesHocKy;
  });

  // Group data by khoiKienThucId and nhomKienThucId after filtering
  const groupedDataByKhoi = {};
  khoiKienThucData.forEach(khoi => {
    groupedDataByKhoi[khoi.id] = {
      nhom: {},
      items: filteredData.filter(item => item.khoiKienThucId === khoi.id),
    };
    const nhomInKhoi = nhomKienThucData.filter(nhom => nhom.khoiKienThucId === khoi.id);
    nhomInKhoi.forEach(nhom => {
      groupedDataByKhoi[khoi.id].nhom[nhom.id] = {
        batBuoc: filteredData.filter(item => item.nhomKienThucId === nhom.id && item.batBuoc),
        tuChon: filteredData.filter(item => item.nhomKienThucId === nhom.id && !item.batBuoc),
      };
    });
  });

  // Calculate total credits for each khoi and nhom
  const khoiCredits = {};
  khoiKienThucData.forEach(khoi => {
    khoiCredits[khoi.id] = groupedDataByKhoi[khoi.id].items.reduce(
      (sum, item) => sum + item.soTinChi,
      0
    );
  });

  const nhomCredits = {};
  nhomKienThucData.forEach(nhom => {
    nhomCredits[nhom.id] = filteredData
      .filter(item => item.nhomKienThucId === nhom.id)
      .reduce((sum, item) => sum + item.soTinChi, 0);
  });

  // Handle add khoi kien thuc
  const handleAddKhoiKienThuc = () => {
    setModal({
      isOpen: true,
      mode: 'addKhoiKienThuc',
      item: {
        thongTinChungId,
      },
    });
  };

  // Handle edit khoi kien thuc
  const handleEditKhoiKienThuc = khoi => {
    setModal({
      isOpen: true,
      mode: 'editKhoiKienThuc',
      item: {
        ...khoi,
        thongTinChungId,
      },
    });
  };

  const handleDeleteKhoiKienThuc = khoiId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khối kiến thức này?')) {
      //xoa roi refresh
      (async () => {
        const response = await KeHoachDayHocService.deleteKhoiKienThuc(khoiId);
        if (response) {
          toast.success('Xóa khối kiến thức thành công');
          setNeedRefresh(true);
        }
      })();
    }
  };

  // Handle add ke hoach day hoc
  const handleAddKeHoachDayHoc = (nhomId, khoiId) => {
    setModal({
      isOpen: true,
      mode: 'addKeHoachDayHoc',
      item: {
        khoiKienThucId: khoiId,
        nhomKienThucId: nhomId,
      },
    });
  };

  // Handle edit ke hoach day hoc
  const handleEditKeHoachDayHoc = (keHoach, nhomId, khoiId) => {
    setModal({
      isOpen: true,
      mode: 'editKeHoachDayHoc',
      item: {
        ...keHoach,
        khoiKienThucId: khoiId,
        nhomKienThucId: nhomId,
      },
    });
    // setModalMode('edit');
    // setCurrentItem({ ...item });
    // setIsModalOpen(true);
  };

  // Handle delete ke hoach day hoc
  const handleDeleteKeHoachDayHoc = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học phần này?')) {
      //xoa roi refresh
      (async () => {
        const response = await KeHoachDayHocService.deleteKeHoachDayHoc(id);
        if (response) {
          toast.success('Xóa học phần thành công');
          setNeedRefresh(true);
        }
      })();
    }
  };

  // Handle add nhom kien thuc
  const handleAddNhomKienThuc = khoiId => {
    setModal({
      isOpen: true,
      mode: 'addNhomKienThuc',
      item: {
        khoiKienThucId: khoiId,
      },
    });
  };

  // Handle edit nhom kien thuc
  const handleEditNhomKienThuc = (nhom, itemsTuChon) => {
    setModal({
      isOpen: true,
      mode: 'editNhomKienThuc',
      item: {
        ...nhom,
        tongSoTinChiTuChon: itemsTuChon.reduce((sum, item) => sum + item.soTinChi, 0),
      },
    });
  };

  const handleDeleteNhomKienThuc = nhomId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhóm kiến thức này?')) {
      //xoa roi refresh
      (async () => {
        const response = await KeHoachDayHocService.deleteNhomKienThuc(nhomId);
        if (response) {
          toast.success('Xóa nhóm kiến thức thành công');
          setNeedRefresh(true);
        }
      })();
    }
  };

  const handleModalClose = () => {
    setModal({
      isOpen: false,
      mode: '',
      item: null,
    });
  };

  // Toggle khoi expansion
  const toggleKhoi = khoiId => {
    setExpandedKhoi({
      ...expandedKhoi,
      [khoiId]: !expandedKhoi[khoiId],
    });
  };

  // Toggle nhom expansion
  const toggleNhom = nhomId => {
    setExpandedNhom({
      ...expandedNhom,
      [nhomId]: !expandedNhom[nhomId],
    });
  };

  // Handle print
  const handlePrint = () => {
    printService.printKeHoachDayHoc(nganh.name, keHoachData, nhomKienThucData, khoiKienThucData);
    setIsPrintMenuOpen(false);
  };

  const showItems = (isExpanded, type, nhom, khoi) => {
    const items = groupedDataByKhoi[khoi.id].nhom[nhom.id][type];
    let tongSoTinChi = items.reduce((sum, item) => sum + item.soTinChi, 0);
    if (type === 'tuChon') tongSoTinChi = `${nhom.soTinChiTuChonToiThieu}/${tongSoTinChi}`;
    return (
      <>
        {isExpanded && items.length > 0 && (
          <>
            <tr className="bg-gray-50 text-sm">
              <td colSpan="3" className="ps-12 border text-start font-medium">
                Học phần {type === 'batBuoc' ? 'bắt buộc' : 'tự chọn'}
              </td>
              <td className="p-3 border text-center font-medium">{tongSoTinChi}</td>
              <td colSpan="14" className="border"></td>
            </tr>
            {items.map((keHoachDayHoc, index) => (
              <tr key={keHoachDayHoc.id} className="hover:bg-gray-50 text-sm">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{keHoachDayHoc.maHP}</td>
                <td className="p-3 border">{keHoachDayHoc.tenHocPhan}</td>
                <td className="p-3 border text-center">{keHoachDayHoc.soTinChi}</td>
                {[...Array(12)].map((_, i) => (
                  <td key={i} className="p-2 border text-center">
                    {keHoachDayHoc.hocKi.includes(i + 1) ? (
                      <span className="inline-block w-4 h-4 bg-blue-500 rounded-sm text-white text-xs flex items-center justify-center">
                        x
                      </span>
                    ) : null}
                  </td>
                ))}
                <td className="p-3 border">{keHoachDayHoc.maHocPhanTruoc}</td>
                <td className="p-3 border">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditKeHoachDayHoc(keHoachDayHoc, nhom.id, khoi.id)}
                      className="text-blue-500 hover:text-blue-700"
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
                      onClick={() => handleDeleteKeHoachDayHoc(keHoachDayHoc.id)}
                      className="text-red-500 hover:text-red-700"
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
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Kế hoạch dạy học</h1>
            <h3>Ngành: {nganh?.name || 'Demo'}</h3>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm học phần..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsPrintMenuOpen(!isPrintMenuOpen)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                    clipRule="evenodd"
                  />
                </svg>
                In
              </button>
              {isPrintMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={handlePrint}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      In tất cả
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleAddKhoiKienThuc}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Thêm khối kiến thức
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Lọc theo nhóm:</span>
            <select
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả nhóm</option>
              {nhomKienThucData.map(group => (
                <option key={group.id} value={group.id}>
                  {group.tenNhom}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Lọc theo học kỳ:</span>
            <select
              value={selectedHocKy}
              onChange={e => setSelectedHocKy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  Học kỳ {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th rowSpan="2" className="p-3 border">
                  TT
                </th>
                <th rowSpan="2" className="p-3 border">
                  Mã HP
                </th>
                <th rowSpan="2" className="p-3 border">
                  Tên Học phần
                </th>
                <th rowSpan="2" className="p-3 border">
                  Số tín chỉ
                </th>
                <th className="p-3 border text-center" colSpan="12">
                  Học kỳ thực hiện
                </th>
                <th rowSpan="2" className="p-3 border">
                  Mã học phần trước
                </th>
                <th rowSpan="2" className="p-3 border">
                  Thao tác
                </th>
              </tr>
              <tr className="bg-gray-100">
                {[...Array(12)].map((_, i) => (
                  <th key={i} className="p-2 border w-8 text-center">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {khoiKienThucData.map((khoi, khoiIndex) => {
                //list ke hoach day hoc in khoi
                const khoiItems = groupedDataByKhoi[khoi.id]?.items || [];
                if (khoiItems.length === 0 && selectedGroup !== 'all') return null;
                const nhomInKhoi = nhomKienThucData.filter(nhom => nhom.khoiKienThucId === khoi.id);

                return (
                  <React.Fragment key={'khoi-' + khoi.id}>
                    {/* Tiêu đề khối kiến thức */}
                    <tr className={`bg-gray-200 border text-lg`}>
                      <td
                        colSpan="3"
                        className="p-3 font-medium cursor-pointer"
                        onClick={() => toggleKhoi(khoi.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>{`${integerToRoman(khoiIndex + 1)}. ${khoi.name}`}</div>
                          <div>
                            {expandedKhoi[khoi.id] ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </td>
                      <td colSpan="1" className="p-2 border text-center">
                        {khoiCredits[khoi.id]}
                      </td>
                      <td colSpan="13"></td>
                      <td>
                        <div className="flex rounded-lg p-1 ">
                          <button
                            className="p-1 rounded-l-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                            title="Sửa khối kiến thức"
                            onClick={() => handleEditKhoiKienThuc(khoi)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                          </button>
                          <button
                            className="p-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                            title="Xóa khối kiến thức"
                            onClick={() => handleDeleteKhoiKienThuc(khoi.id)}
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
                              ></path>
                            </svg>
                          </button>
                          <button
                            className="p-1 me-3 rounded-r-md bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
                            title="Thêm nhóm kiến thức"
                            onClick={() => handleAddNhomKienThuc(khoi.id)}
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedKhoi[khoi.id] && (
                      <>
                        {
                          // Multiple nhom in khoi, display grouped by nhom, tu chon/bat buoc
                          nhomInKhoi.map((nhom, nhomIndex) => {
                            const nhomItemsBatBuoc =
                              groupedDataByKhoi[khoi.id].nhom[nhom.id].batBuoc || [];
                            const nhomItemsTuChon =
                              groupedDataByKhoi[khoi.id].nhom[nhom.id].tuChon || [];
                            if (
                              nhomItemsBatBuoc.length === 0 &&
                              nhomItemsTuChon.length === 0 &&
                              selectedGroup !== 'all'
                            )
                              return null;

                            return (
                              // in 1 dong tong hop, va cac ke hoach trong nhom
                              <React.Fragment key={`khoi-${khoi.id}-nhom-${nhom.id}`}>
                                <tr className={`${getGroupColor(nhomIndex)} border text-sm`}>
                                  <td
                                    colSpan="3"
                                    className="p-3 font-medium cursor-pointer"
                                    onClick={() => toggleNhom(nhom.id)}
                                  >
                                    <div className="ps-3 flex justify-between items-center">
                                      <div>{`${nhomIndex + 1}. ${nhom.tenNhom}`}</div>
                                      <div>
                                        {expandedNhom[nhom.id] ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td colSpan="1" className="p-3 border text-center">
                                    {nhomCredits[nhom.id]}
                                  </td>
                                  <td colSpan="14">
                                    <div className="flex rounded-lg p-1 justify-end">
                                      <button
                                        className="p-1 rounded-l-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                        title="Sửa nhóm kiến thức"
                                        onClick={() =>
                                          handleEditNhomKienThuc(nhom, nhomItemsTuChon)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                        </svg>
                                      </button>
                                      <button
                                        className="p-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                                        title="Xóa nhóm kiến thức"
                                        onClick={() => handleDeleteNhomKienThuc(nhom.id)}
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
                                          ></path>
                                        </svg>
                                      </button>
                                      <button
                                        className="p-1 me-3 rounded-r-md bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
                                        title="Thêm kế hoạch dạy học"
                                        onClick={() => handleAddKeHoachDayHoc(nhom.id, khoi.id)}
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
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                {/* hien thi nhom tuchon/bat buoc neu length > 0*/}
                                {showItems(expandedNhom[nhom.id], 'batBuoc', nhom, khoi)}
                                {showItems(expandedNhom[nhom.id], 'tuChon', nhom, khoi)}
                                {expandedNhom[nhom.id] &&
                                  nhomItemsBatBuoc.length === 0 &&
                                  nhomItemsTuChon.length === 0 && (
                                    <tr>
                                      <td
                                        colSpan="18"
                                        className="p-3 border text-center text-gray-500 text-sm"
                                      >
                                        Không có học phần nào trong nhóm này
                                      </td>
                                    </tr>
                                  )}
                              </React.Fragment>
                            );
                          })
                        }

                        {expandedKhoi[khoi.id] && nhomInKhoi.length === 0 && (
                          <tr>
                            <td
                              colSpan="18"
                              className="p-3 border text-center text-gray-500 text-sm"
                            >
                              Không có học phần nào trong khối này
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </React.Fragment>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="18" className="p-3 border text-center text-gray-500">
                    Không tìm thấy học phần nào
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-medium">
                <td colSpan="3" className="p-3 border text-right">
                  Tổng số tín chỉ:
                </td>
                <td className="p-3 border text-center">
                  {filteredData.reduce((sum, item) => sum + item.soTinChi, 0)}
                </td>
                <td colSpan="14" className="p-3 border"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <AddKeHoachDayHocModal
        isOpen={modal.isOpen && modal.mode === 'addKeHoachDayHoc'}
        listKhoiKienThuc={khoiKienThucData}
        listNhomKienThuc={nhomKienThucData}
        keHoachDayHoc={modal.item}
        onClose={handleModalClose}
        refresh={() => setNeedRefresh(true)}
      />

      <EditKeHoachDayHocModal
        isOpen={modal.isOpen && modal.mode === 'editKeHoachDayHoc'}
        listKhoiKienThuc={khoiKienThucData}
        listNhomKienThuc={nhomKienThucData}
        keHoachDayHoc={modal.item}
        onClose={handleModalClose}
        refresh={() => setNeedRefresh(true)}
      />

      <AddKhoiKienThucModal
        isOpen={modal.isOpen && modal.mode === 'addKhoiKienThuc'}
        khoiKienThuc={modal.item}
        onClose={handleModalClose}
        refresh={() => setNeedRefresh(true)}
      />

      <EditKhoiKienThucModal
        isOpen={modal.isOpen && modal.mode === 'editKhoiKienThuc'}
        khoiKienThuc={modal.item}
        onClose={handleModalClose}
        refresh={() => setNeedRefresh(true)}
      />

      <ThemNhomKienThucModal
        isOpen={modal.isOpen && modal.mode === 'addNhomKienThuc'}
        nhomKienThuc={modal.item}
        onClose={handleModalClose}
        refresh={() => setNeedRefresh(true)}
      />

      <SuaNhomKienThucModal
        isOpen={modal.isOpen && modal.mode === 'editNhomKienThuc'}
        nhomKienThuc={modal.item}
        onClose={handleModalClose}
        refresh={() => setNeedRefresh(true)}
      />
    </div>
  );
};

export default KeHoachDayHocPage;
