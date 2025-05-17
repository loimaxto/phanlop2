import { useState } from 'react';
import { toast } from 'react-toastify';
import KeHoachDayHocService from '../../services/KeHoachDayHocService';

export default function AddNhomKienThucModal({ isOpen, onClose, refresh, nhomKienThuc }) {
  console.log('nhomKienThuc', nhomKienThuc);
  if (!isOpen) return null;

  // {
  //   "maNhom": "string",
  //   "soTinChiTuChonToiThieu": 1073741824,
  //   "tenNhom": "string",
  //   "tichLuy": true,
  //   "khoiKienThucId": 1073741824
  // }
  const [formData, setFormData] = useState({
    maNhom: '',
    tenNhom: '',
    soTinChiTuChonToiThieu: 0,
    tichLuy: false,
    ...nhomKienThuc,
  });

  // Xử lý thay đổi input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi checkbox
  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!formData.maNhom || !formData.tenNhom) {
      toast.error('Vui lòng nhập mã nhóm và tên nhóm');
      return;
    }

    let data = {
      maNhom: formData.maNhom,
      tenNhom: formData.tenNhom,
      soTinChiTuChonToiThieu: formData.soTinChiTuChonToiThieu,
      tichLuy: formData.tichLuy,
      khoiKienThucId: formData.khoiKienThucId,
    };

    try {
      const response = await KeHoachDayHocService.updateNhomKienThuc(nhomKienThuc.id, data);
      if (response) {
        toast.success('Update nhóm kiến thức thành công');
        refresh();
        onClose();
      }
    } catch (error) {
      toast.error('Lỗi khi update nhóm kiến thức');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000094]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-xl font-semibold mb-4">Sửa Nhóm Kiến Thức</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mã Nhóm</label>
            <input
              type="text"
              name="maNhom"
              value={formData.maNhom}
              onChange={handleChange}
              placeholder="Nhập mã nhóm"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tên Nhóm</label>
            <input
              type="text"
              name="tenNhom"
              value={formData.tenNhom}
              onChange={handleChange}
              placeholder="Nhập tên nhóm"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Số tín chỉ tự chọn tối thiểu</label>
            <input
              type="number"
              name="soTinChiTuChonToiThieu"
              value={formData.soTinChiTuChonToiThieu}
              onChange={handleChange}
              placeholder="Nhập số tín chỉ tự chọn tối thiểu"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="tichLuy"
                checked={formData.tichLuy}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Tích lũy
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
