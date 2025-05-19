import { useAppContext } from '../../context/AppContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import KeHoachMoNhomService from '../../services/KeHoachMoNhomService';
import { toast } from 'react-toastify';

export default function ThemKeHoachMoNhom() {
  const navigate = useNavigate();
  const { listHocPhan } = useAppContext();
  const [formData, setFormData] = useState({
    maHocPhan: '',
    khoa: '',
    namHoc: '',
    tongSoNhom: '',
    tongSoSinhVien: '',
    heSo: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    // console.log('Field changed:', name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.maHocPhan || formData.maHocPhan === '') {
      alert('Vui lòng chọn học phần!');
      return;
    }

    (async () => {
      try {
        // console.log('Form data before submission:', formData);
        const response = await KeHoachMoNhomService.createKeHoachMoNhom(formData);
        if (!response) {
          return;
        }
        toast.success('Thêm kế hoạch mở nhóm thành công');
        setFormData({
          maHocPhan: '',
          khoa: '',
          namHoc: '',
          tongSoNhom: '',
          tongSoSinhVien: '',
          heSo: '',
        });
        navigate('/ke-hoach-mo-nhom');
      } catch (error) {
        console.error('Error creating kế hoạch mở nhóm:', error);
      }
    })();
  };

  return (
    <div className="max-w-xl mx-auto mt-3 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Thêm Kế Hoạch Mở Nhóm</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Học phần</label>
          <select
            name="maHocPhan"
            value={formData.maHocPhan}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">Chọn học phần</option>
            {listHocPhan.map(hocPhan => (
              <option key={hocPhan.id} value={hocPhan.maHocPhan}>
                {hocPhan.maHocPhan} - {hocPhan.tenHocPhan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Khoa</label>
          <input
            type="text"
            name="khoa"
            value={formData.khoa}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Năm học</label>
          <input
            type="text"
            name="namHoc"
            value={formData.namHoc}
            onChange={handleChange}
            placeholder="VD: 2024-2025"
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tổng số nhóm</label>
          <input
            type="number"
            name="tongSoNhom"
            value={formData.tongSoNhom}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tổng số sinh viên</label>
          <input
            type="number"
            name="tongSoSinhVien"
            value={formData.tongSoSinhVien}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hệ số</label>
          <input
            type="number"
            name="heSo"
            step="0.1"
            value={formData.heSo}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu kế hoạch
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-2"
        >
          Hủy
        </button>
      </form>
    </div>
  );
}
