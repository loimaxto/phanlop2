import { useState } from 'react';
import { toast } from 'react-toastify';
import KeHoachDayHocService from '../../services/KeHoachDayHocService';

export default function EditKhoiKienThucModal({ isOpen, onClose, refresh, khoiKienThuc }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    id: 0,
    ...khoiKienThuc,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    // const tenKhoiKienThuc = formData.get('tenKhoiKienThuc');

    if (!formData.name) {
      toast.error('Vui lòng nhập tên khối kiến thức');
      return;
    }

    let data = {
      name: formData.name,
      thongTinChungId: khoiKienThuc.thongTinChungId,
    };

    try {
      const response = await KeHoachDayHocService.updateKhoiKienThuc(formData.id, data);
      if (response) {
        toast.success('Update khối kiến thức thành công');
        refresh();
        onClose();
      }
    } catch (error) {
      toast.error('Lỗi khi update khối kiến thức');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000094]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-xl font-semibold mb-4">Thêm Khối Kiến Thức</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tên Khối Kiến Thức</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên khối kiến thức"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
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
