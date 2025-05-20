import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdImportExport } from 'react-icons/md';
import { FaSearch, FaEye, FaTrashAlt } from 'react-icons/fa';

import GiangVienDetailsModal from './GiangVienDetailsModal';
import GiangVienEditModal from './GiangVienEditModal';
import ThemGiangVienModal from './ThemGiangVienModal';
import MauinGiangVienModal from './MauinGiangVienModal';

import { getListAll as getNganhList } from '@/services/nganhService';
import {
  getGiangVienList,
  searchGiangVien,
  getGiangVienByBoMon,
  deleteGiangVien,
} from '@/services/giangVienService';

const GiangVienPage = () => {
  const [giangVienList, setGiangVienList] = useState([]);
  const [selectedGiangVien, setSelectedGiangVien] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [selectedBoMon, setSelectedBoMon] = useState('1');
  const [searchText, setSearchText] = useState('');
  const [nganhList, setNganhList] = useState([]);

  useEffect(() => {
    const fetchNganh = async () => {
      try {
        const data = await getNganhList().then(res => res.data);
        setNganhList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngành:', error);
      }
    };
    fetchNganh();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        let data = [];
        if (searchText.trim()) {
          data = await searchGiangVien(searchText.trim());
        } else if (selectedBoMon !== '1') {
          data = await getGiangVienByBoMon(selectedBoMon);
        } else {
          data = await getGiangVienList();
        }

        // 🔍 Loại bỏ giảng viên trùng ID (nếu có)
        const uniqueMap = new Map();
        data.forEach(gv => {
          const id = gv.id || gv.giangVienID;
          if (!uniqueMap.has(id)) {
            uniqueMap.set(id, gv);
          }
        });
        const uniqueGVList = Array.from(uniqueMap.values());

        const dataWithTiet = await Promise.all(
          uniqueGVList.map(async gv => {
            try {
              const id = gv.id || gv.giangVienID;
              const res = await fetch(`http://localhost:8080/api/phanconggiangday/${id}`);
              if (!res.ok) throw new Error(`Lỗi khi gọi API: ${res.status}`);
              const tietData = await res.json();
              const firstTiet = tietData[0] || {};

              const tongTiet = tietData.reduce((sum, item) => {
                const hk1 = Number(item.hk1 || 0);
                const hk2 = Number(item.hk2 || 0);
                const hk3 = Number(item.hk3 || 0);
                const soTiet = Number(item.soTiet || 0);
                return sum + (hk1 + hk2 + hk3) * soTiet;
              }, 0);

              return {
                id,
                ten: firstTiet.tenGV || gv.ten || 'Không rõ',
                namSinh: firstTiet.namSinh || gv.namSinh || 0,
                chucDanh: firstTiet.chucDanh || gv.chucDanh || '',
                trinhDo: firstTiet.trinhDo || gv.trinhDo || '',
                tongTiet,
              };
            } catch (err) {
              console.error(`Lỗi khi xử lý tiết của GV:`, err);
              return {
                id: gv.id || gv.giangVienID,
                ten: gv.ten || 'Không rõ',
                namSinh: gv.namSinh || 0,
                chucDanh: gv.chucDanh || '',
                trinhDo: gv.trinhDo || '',
                tongTiet: 0
              };
            }
          })
        );

        setGiangVienList(dataWithTiet);
      } catch (error) {
        console.error('❌ Lỗi khi lấy danh sách giảng viên:', error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText, selectedBoMon]);

  const handleView = (e, gv) => {
    e.stopPropagation();
    setSelectedGiangVien(gv);
    setIsModalOpen(true);
  };

  const handleEdit = (e, gv) => {
    e.stopPropagation();
    setSelectedGiangVien(gv);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = updatedGV => {
    setGiangVienList(prev => prev.map(gv => (gv.id === updatedGV.id ? updatedGV : gv)));
  };

  const handleDelete = async (e, gv) => {
    e.stopPropagation();
    if (!window.confirm(`Bạn có chắc muốn xoá ${gv.ten}?`)) return;

    try {
      await deleteGiangVien(gv.id);
      setGiangVienList(prev => prev.filter(item => item.id !== gv.id));
      alert('Đã xoá giảng viên');
    } catch (error) {
      console.error(error);
      alert('Lỗi khi xoá giảng viên');
    }
  };

  const handleAddGiangVien = newGV => {
    setGiangVienList(prev => [...prev, newGV]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <button className="btn btn-primary gap-2" onClick={() => setIsAddModalOpen(true)}>
            <MdAdd /> Thêm
          </button>
          <button className="btn btn-accent gap-2" onClick={() => setIsExportModalOpen(true)}>
            <MdImportExport /> Export mẫu in
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full lg:w-1/2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm giảng viên"
              className="input input-bordered w-full pr-10"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          <select
            className="select select-bordered w-full"
            value={selectedBoMon}
            onChange={e => setSelectedBoMon(e.target.value)}
          >
            <option value="1">Tất cả</option>
            {nganhList.map(nganh => (
              <option key={nganh.tenNganh} value={nganh.tenNganh}>
                {nganh.tenNganh}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-center uppercase">
          Bảng phân công công tác của cán bộ, giảng viên cơ hữu
        </h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra table-auto">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>STT</th>
                <th>Mã CB</th>
                <th>Họ và tên GV</th>
                <th>Năm sinh</th>
                <th>Chức danh, học vị</th>
                <th>Trình độ</th>
                <th className="text-center">Tổng tiết công tác</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {giangVienList.length ? (
                giangVienList.map((gv, idx) => (
                  <tr key={`${gv.id}-${idx}`} className="hover:bg-gray-100 text-center">
                    <td>{idx + 1}</td>
                    <td>{gv.id}</td>
                    <td>{gv.ten}</td>
                    <td>{gv.namSinh}</td>
                    <td>{gv.chucDanh}</td>
                    <td>{gv.trinhDo}</td>
                    <td>{gv.tongTiet}</td>
                    <td>
                      <div className="flex justify-center gap-4 text-lg">
                        <button title="Xem chi tiết" className="text-blue-600 hover:text-blue-800" onClick={e => handleView(e, gv)}>
                          <FaEye />
                        </button>
                        <button title="Chỉnh sửa" className="text-green-600 hover:text-green-800" onClick={e => handleEdit(e, gv)}>
                          <MdEdit />
                        </button>
                        <button title="Xoá" className="text-red-600 hover:text-red-800" onClick={e => handleDelete(e, gv)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <GiangVienDetailsModal
          giangVien={selectedGiangVien}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedGiangVien(null);
          }}
        />
      )}

      {isEditModalOpen && (
        <GiangVienEditModal
          giangVien={selectedGiangVien}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}

      <ThemGiangVienModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddGiangVien}
      />

      <MauinGiangVienModal
        show={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export default GiangVienPage;
