'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import KeHoachDayHocService from '../../services/KeHoachDayHocService';
import { toast } from 'react-toastify';

const AddKeHoachDayHocModal = ({
  isOpen,
  onClose,
  refresh,
  keHoachDayHoc,
  listNhomKienThuc,
  listKhoiKienThuc,
}) => {
  // return null;
  if (!isOpen) return null;

  const { listHocPhan } = useAppContext();

  const [formData, setFormData] = useState({
    maHocPhan: '',
    hocPhanId: 0,
    khoiKienThucId: '', // Thêm trường cho khối kiến thức
    nhomKienThucId: '',
    batBuoc: false,
    hocKi: [],
    ...keHoachDayHoc,
  });

  // Xử lý thay đổi trường dữ liệu
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Xử lý thay đổi học phần (cập nhật cả hocPhanId và maHocPhan)
  const handleHocPhanChange = e => {
    const selectedHocPhanId = parseInt(e.target.value);
    const selectedHocPhan = listHocPhan.find(hp => hp.id === selectedHocPhanId);
    setFormData(prev => ({
      ...prev,
      hocPhanId: selectedHocPhanId || 0,
      maHocPhan: selectedHocPhan ? selectedHocPhan.maHocPhan : '',
    }));
  };

  // Xử lý thay đổi khối kiến thức (lọc nhóm kiến thức)
  const handleKhoiChange = e => {
    const selectedKhoiId = e.target.value;
    setFormData(prev => ({
      ...prev,
      khoiKienThucId: selectedKhoiId,
      nhomKienThucId: '', // Reset nhóm khi thay đổi khối
    }));
  };

  // Lọc nhóm kiến thức dựa trên khối kiến thức được chọn
  const filteredNhomKienThuc = listNhomKienThuc.filter(
    nhom => !formData.khoiKienThucId || nhom.khoiKienThucId == formData.khoiKienThucId
  );

  // Xử lý thay đổi nhóm kiến thức
  const handleGroupChange = e => {
    setFormData({
      ...formData,
      nhomKienThucId: e.target.value,
    });
  };

  // Xử lý thay đổi học kỳ (checkbox)
  const handleHocKiChange = hocKi => {
    const hocKiArray = [...formData.hocKi];

    if (hocKiArray.includes(hocKi)) {
      const index = hocKiArray.indexOf(hocKi);
      hocKiArray.splice(index, 1);
    } else {
      hocKiArray.push(hocKi);
    }

    setFormData({
      ...formData,
      hocKi: hocKiArray.sort((a, b) => a - b),
    });
  };

  // Xử lý lưu form
  const handleSubmit = () => {
    const dataToSave = {
      maHocPhan: formData.maHocPhan,
      hocPhanId: parseInt(formData.hocPhanId),
      nhomKienThucId: parseInt(formData.nhomKienThucId),
      batBuoc: formData.batBuoc,
      hocKi: formData.hocKi,
    };

    (async () => {
      const response = await KeHoachDayHocService.addKeHoachDayHoc(dataToSave);
      if (response) {
        toast.success('Thêm kế hoạch dạy học thành công');
        refresh();
        onClose();
      }
    })();
  };

  // Reset form khi đóng modal
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        maHocPhan: '',
        hocPhanId: 0,
        khoiKienThucId: '',
        nhomKienThucId: '',
        batBuoc: false,
        hocKi: [],
      });
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-[#00000094] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Thêm học phần mới</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Học phần */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Tên học phần</label>
            <select
              name="hocPhanId"
              value={formData.hocPhanId || ''}
              onChange={handleHocPhanChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn học phần</option>
              {listHocPhan.map(item => (
                <option key={item.id} value={item.id}>
                  {item.maHocPhan} - {item.tenHocPhan}
                </option>
              ))}
            </select>
          </div>

          {/* Khối kiến thức */}
          <div>
            <label className="block text-sm font-medium mb-1">Khối kiến thức</label>
            <select
              name="khoiKienThucId"
              value={formData.khoiKienThucId || ''}
              onChange={handleKhoiChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn khối kiến thức</option>
              {listKhoiKienThuc.map(khoi => (
                <option key={khoi.id} value={khoi.id}>
                  {khoi.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nhóm kiến thức */}
          <div>
            <label className="block text-sm font-medium mb-1">Nhóm kiến thức</label>
            <select
              name="nhomKienThucId"
              value={formData.nhomKienThucId || ''}
              onChange={handleGroupChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!formData.khoiKienThucId} // Disable if no khoi selected
            >
              <option value="">Chọn nhóm kiến thức</option>
              {filteredNhomKienThuc.map(group => (
                <option key={group.id} value={group.id}>
                  {group.tenNhom}
                </option>
              ))}
            </select>
          </div>

          {/* Bắt buộc */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Bắt buộc</label>
            <input
              type="checkbox"
              name="batBuoc"
              checked={formData.batBuoc}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Có</span>
          </div>
        </div>

        {/* Học kỳ thực hiện */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Học kỳ thực hiện</label>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={`hocki-${i + 1}`}
                  checked={formData.hocKi.includes(i + 1)}
                  onChange={() => handleHocKiChange(i + 1)}
                  className="mr-2"
                />
                <label htmlFor={`hocki-${i + 1}`}>Học kỳ {i + 1}</label>
              </div>
            ))}
          </div>
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
      </div>
    </div>
  );
};

export default AddKeHoachDayHocModal;
