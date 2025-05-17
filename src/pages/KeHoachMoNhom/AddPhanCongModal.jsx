import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import KeHoachMoNhomService from '../../services/KeHoachMoNhomService';
import { toast } from 'react-toastify';

const AddPhanCongModal = ({ isOpen, onClose, keHoachMoNhom, onSave }) => {
  if (!isOpen || !keHoachMoNhom) return null;

  //   {
  //   "giangVienId": 9007199254740991,
  //   "keHoachMoNhomId": 9007199254740991,
  //   "soNhom": 1073741824,
  //   "hocKyDay": 1,
  //   "loai": "Bai tap",//Ly thuyet|Thuc hanh|Bai tap|Tat ca
  //   "soTietThucHien": 1073741824
  // }
  const hocPhan = keHoachMoNhom.hocPhan;
  const [formData, setFormData] = useState({
    giangVienId: 0,
    keHoachMoNhomId: keHoachMoNhom.id,
    soNhom: 0,
    hocKyDay: 1,
    loai: 'Bai tap',
    soTietThucHien: 0,
  });
  const { listGiangVien } = useAppContext();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'soNhom') {
      //tinh so tiet thuc hien tu loai tuong ung voi so tiet tu hoc phan
      const map = {
        'Bai tap': hocPhan.soTietBaiTap,
        'Ly thuyet': hocPhan.soTietLyThuyet,
        'Thuc hanh': hocPhan.soTietThucHanh,
        'Tat ca': hocPhan.soTietTongCong,
      };
      const soTietThucHien = map[formData.loai] * value;
      setFormData(prev => ({ ...prev, soTietThucHien, [name]: value }));
      return;
    }
    if (name === 'loai') {
      //tinh so tiet thuc hien tu loai tuong ung voi so tiet tu hoc phan
      const map = {
        'Bai tap': hocPhan.soTietBaiTap,
        'Ly thuyet': hocPhan.soTietLyThuyet,
        'Thuc hanh': hocPhan.soTietThucHanh,
        'Tat ca': hocPhan.soTietTongCong,
      };
      const soTietThucHien = map[value] * formData.soNhom;
      setFormData(prev => ({ ...prev, soTietThucHien, [name]: value }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.giangVienId || formData.giangVienId === '') {
      toast.error('Vui lòng chọn giảng viên!');
      return;
    }
    if (!formData.soNhom || formData.soNhom === '') {
      toast.error('Vui lòng nhập số nhóm!');
      return;
    }
    if (!formData.soTietThucHien || formData.soTietThucHien === '') {
      toast.error('Số tiết thực hiện phải lớn hơn 0!');
      return;
    }
    console.log('Form data before submission:', formData);
    // Call the API to create the new assignment
    (async () => {
      const response = await KeHoachMoNhomService.createPhanCong(formData);
      if (!response) {
        return;
      }
      toast.success('Thêm phân công giảng dạy thành công');
      setFormData({
        giangVienId: 0,
        keHoachMoNhomId: keHoachMoNhom.id,
        soNhom: 1,
        hocKyDay: 1,
        loai: 'Bai tap',
        soTietThucHien: 1,
      });
      onSave();
    })();
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Thêm phân công giảng dạy</h2>

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
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-0 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Loại</label>
            <select
              name="loai"
              value={formData.loai || ''}
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
              value={formData.hocKyDay || 1}
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

export default AddPhanCongModal;
