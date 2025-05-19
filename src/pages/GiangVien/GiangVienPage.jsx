import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdImportExport } from 'react-icons/md';
import { FaSearch, FaEye, FaTrashAlt } from 'react-icons/fa';
import GiangVienDetailsModal from './GiangVienDetailsModal';
import GiangVienEditModal from './GiangVienEditModal';
import ThemGiangVienModal from './ThemGiangVienModal';
import MauinGiangVienModal from './MauinGiangVienModal';

const GiangVienPage = () => {
  const [giangVienList, setGiangVienList] = useState([]);
  const [selectedGiangVien, setSelectedGiangVien] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKhoa, setSelectedKhoa] = useState('1');
  const [searchText, setSearchText] = useState('');
  const [nganhList, setNganhList] = useState([]); // Lưu danh sách ngành
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    const fetchNganhData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/nganh/get-list'); // API để lấy ngành
        const data = await res.json().then(res => res.data);

        setNganhList(data); // Cập nhật danh sách ngành vào state
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngành:', error);
      }
    };

    fetchNganhData();
  }, []);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchGiangVien = async () => {
      try {
        // Gọi API theo tên nếu có search
        const apiUrl = searchText.trim()
          ? `http://localhost:8080/api/v1/giang-vien/search/${encodeURIComponent(searchText)}`
          : 'http://localhost:8080/api/v1/giang-vien';

        const res = await fetch(apiUrl);
        const giangVienData = await res.json();

        const withTietPromises = giangVienData.map(async gv => {
          try {
            const tietRes = await fetch(`http://localhost:8080/api/phanconggiangday/${gv.id}`);
            const tietData = await tietRes.json();

            const tongTiet = tietData.reduce((sum, item) => {
              const heSo = Number(item.hk1) + Number(item.hk2) + Number(item.hk3);
              return sum + heSo * Number(item.SoTiet || 0);
            }, 0);

            return {
              ...gv,
              tongTiet,
            };
          } catch (err) {
            console.error(`Lỗi khi lấy tiết cho GV ${gv.id}:`, err);
            return {
              ...gv,
              tongTiet: 0,
            };
          }
        });

        const giangVienWithTiet = await Promise.all(withTietPromises);
        setGiangVienList(giangVienWithTiet);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    // Debounce 500ms khi tìm kiếm
    const timeout = setTimeout(fetchGiangVien, 500);

    return () => clearTimeout(timeout);
  }, [searchText]);

  const handleView = (e, giangVien) => {
    e.stopPropagation();
    setSelectedGiangVien(giangVien);
    setIsModalOpen(true);
  };

  const handleEdit = (e, giangVien) => {
    e.stopPropagation();
    setSelectedGiangVien(giangVien);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = updatedGV => {
    // Gọi API PUT/POST tại đây nếu cần, hiện chỉ cập nhật local
    setGiangVienList(prev => prev.map(gv => (gv.id === updatedGV.id ? updatedGV : gv)));
  };

  const handleDelete = async (e, giangVien) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`Bạn có chắc muốn xoá ${giangVien.tenGV}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/v1/giang-vien/delete/${giangVien.id}`, {
        method: 'PUT',
      });

      if (!res.ok) {
        throw new Error('Lỗi khi xoá giảng viên');
      }

      // Xoá khỏi UI sau khi xoá thành công trên server
      setGiangVienList(prev => prev.filter(gv => gv.id !== giangVien.id));

      alert('Đã xoá giảng viên');
    } catch (err) {
      console.error(err);
      alert('Lỗi khi xoá giảng viên');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGiangVien(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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
              onChange={e => setSearchText(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
          <select
            className="select select-bordered w-full"
            value={selectedKhoa}
            onChange={async e => {
              const khoa = e.target.value;
              setSelectedKhoa(khoa);

              try {
                let url = 'http://localhost:8080/api/v1/giang-vien';

                if (khoa !== '1') {
                  url = `http://localhost:8080/api/v1/giang-vien/by-khoa/${khoa}`;
                }

                const res = await fetch(url);
                const data = await res.json().then(res => res.data);

                const withTietPromises = data.map(async gv => {
                  try {
                    const tietRes = await fetch(
                      `http://localhost:8080/api/phanconggiangday/${gv.id}`
                    );
                    const tietData = await tietRes.json().then(res => res.data);

                    const tongTiet = tietData.reduce((sum, item) => {
                      const heSo = Number(item.hk1) + Number(item.hk2) + Number(item.hk3);
                      return sum + heSo * Number(item.SoTiet || 0);
                    }, 0);

                    return {
                      ...gv,
                      tongTiet,
                    };
                  } catch (err) {
                    console.error(`Lỗi khi lấy tiết cho GV ${gv.id}:`, err);
                    return {
                      ...gv,
                      tongTiet: 0,
                    };
                  }
                });

                const giangVienWithTiet = await Promise.all(withTietPromises);
                setGiangVienList(giangVienWithTiet);
              } catch (error) {
                console.error('Lỗi khi lọc theo ngành:', error);
              }
            }}
          >
            <option disabled value="">
              Chọn ngành
            </option>
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
              {giangVienList.length > 0 ? (
                giangVienList.map((giangVien, index) => (
                  <tr key={giangVien.maCB} className="hover:bg-gray-100 text-center">
                    <td>{index + 1}</td>
                    <td>{giangVien.id}</td>
                    <td>{giangVien.tenGV}</td>
                    <td>{giangVien.namSinh}</td>
                    <td>{giangVien.chucDanh}</td>
                    <td>{giangVien.trinhDo}</td>
                    <td>{giangVien.tongTiet}</td>
                    <td>
                      <div className="flex justify-center gap-4 text-lg">
                        <button
                          title="Xem chi tiết"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={e => handleView(e, giangVien)}
                        >
                          <FaEye />
                        </button>
                        <button
                          title="Chỉnh sửa"
                          className="text-green-600 hover:text-green-800"
                          onClick={e => handleEdit(e, giangVien)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          title="Xoá"
                          className="text-red-600 hover:text-red-800"
                          onClick={e => handleDelete(e, giangVien)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <GiangVienDetailsModal giangVien={selectedGiangVien} onClose={handleCloseModal} />
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
        onSave={newGV => {
          // TODO: Gọi API để lưu giảng viên mới
          console.log('Giảng viên mới:', newGV);
        }}
      />

      <MauinGiangVienModal show={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
};

export default GiangVienPage;
