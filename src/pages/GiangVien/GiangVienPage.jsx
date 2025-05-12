import React, { useState, useEffect } from 'react'; 
import { MdAdd, MdEdit, MdImportExport } from 'react-icons/md'; 
import { FaSearch, FaEye, FaTrashAlt } from 'react-icons/fa';
import GiangVienDetailsModal from './GiangVienDetailsModal';

const GiangVienPage = () => {
  const [giangVienList, setGiangVienList] = useState([]);
  const [selectedGiangVien, setSelectedGiangVien] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchGiangVien = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/giangvien');
        const data = await response.json();
        setGiangVienList(data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
  
    fetchGiangVien();
  }, []);
  

  const handleView = (e, giangVien) => {
    e.stopPropagation();
    setSelectedGiangVien(giangVien);
    setIsModalOpen(true);
  };

  const handleEdit = (e, giangVien) => {
    e.stopPropagation();
    alert(`Chỉnh sửa giảng viên: ${giangVien.hoTen}`);
  };

  const handleDelete = (e, giangVien) => {
    e.stopPropagation();
    const confirm = window.confirm(`Bạn có chắc muốn xoá ${giangVien.hoTen}?`);
    if (confirm) {
      alert(`Đã xoá: ${giangVien.hoTen}`);
      // Xử lý xoá ở đây (gọi API, cập nhật state, v.v.)
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
          <button className="btn btn-primary gap-2">
            <MdAdd /> Thêm
          </button>
          <button className="btn btn-accent gap-2">
            <MdImportExport /> Export mẫu in
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full lg:w-1/2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm giảng viên"
              className="input input-bordered w-full pr-10"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
          <select className="select select-bordered w-full">
            <option disabled selected>Chọn ngành</option>
            <option value="CNTT">CNTT</option>
            <option value="Sư phạm">Sư phạm</option>
            <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
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
                    <td>{10}</td>
                    <td>
                      <div className="flex justify-center gap-4 text-lg">
                        <button
                          title="Xem chi tiết"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={(e) => handleView(e, giangVien)}
                        >
                          <FaEye />
                        </button>
                        <button
                          title="Chỉnh sửa"
                          className="text-green-600 hover:text-green-800"
                          onClick={(e) => handleEdit(e, giangVien)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          title="Xoá"
                          className="text-red-600 hover:text-red-800"
                          onClick={(e) => handleDelete(e, giangVien)}
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
        <GiangVienDetailsModal 
          giangVien={selectedGiangVien} 
          onClose={handleCloseModal} 
        /> 
      )} 
    </div> 
  ); 
}; 

export default GiangVienPage;
