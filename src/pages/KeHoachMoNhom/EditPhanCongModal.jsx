import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import KeHoachMoNhomService from '../../services/KeHoachMoNhomService';
import { toast } from 'react-toastify';

const EditPhanCongModal = ({ isOpen, onClose, phanCong, keHoachMoNhom, onSave }) => {
  if (!isOpen || !phanCong || !keHoachMoNhom) return null;

  const { listGiangVien } = useAppContext();
  const [formData, setFormData] = useState({
    giangVienId: phanCong.giangVien.id,
    keHoachMoNhomId: keHoachMoNhom.id,
    soNhom: phanCong.soNhom,
    hocKyDay: phanCong.hocKyDay,
    loai: phanCong.loai,
    soTietThucHien: phanCong.soTietThucHien,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.giangVienId || formData.giangVienId === '') {
      alert('Vui lòng chọn giảng viên!');
      return;
    }
    if (!formData.soNhom || formData.soNhom === '') {
      alert('Vui lòng nhập số nhóm!');
      return;
    }
    if (!formData.soTietThucHien || formData.soTietThucHien === '') {
      alert('Vui lòng nhập số tiết thực hiện!');
      return;
    }

    const response = await KeHoachMoNhomService.updatePhanCong(phanCong.id, formData);
    if (!response) return;

    toast.success('Cập nhật phân công giảng dạy thành công');
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Sửa phân công giảng dạy</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Số nhóm</label>
            <input
              type="number"
              name="soNhom"
              value={formData.soNhom}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mã CBGD</label>
            <select
              name="giangVienId"
              value={formData.giangVienId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn giảng viên</option>
              {listGiangVien.map(item => (
                <option key={item.id} value={item.id}>
                  {item.id} - {item.ten}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết thực hiện</label>
            <input
              type="number"
              name="soTietThucHien"
              value={formData.soTietThucHien}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Loại</label>
            <select
              name="loai"
              value={formData.loai}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn loại</option>
              <option value="Ly thuyet">Lý thuyết</option>
              <option value="Thuc hanh">Thực hành</option>
              <option value="Bai tap">Bài tập</option>
              <option value="Tat ca">Tất cả</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Học kỳ dạy</label>
            <select
              name="hocKyDay"
              value={formData.hocKyDay}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Học kỳ 1</option>
              <option value="2">Học kỳ 2</option>
              <option value="3">Học kỳ 3</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPhanCongModal;
