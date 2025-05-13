import { hocPhanData, keHoachMoNhomData } from '../../dumpData';
import { useState, useEffect } from 'react';

const EditKeHoachModal = ({ isOpen, onClose, keHoach, refresh }) => {
  if (!isOpen || !keHoach) return null;

  const [maHP, setMaHP] = useState(keHoach.hocPhan_id || keHoach.hocPhan?.id || '');
  const [formKeHoach, setFormKeHoach] = useState(keHoach);

  //xu ly thay doi maHP
  useEffect(() => {
    let hocPhan = hocPhanData.find(item => item.id == maHP);
    if (hocPhan) {
      setFormKeHoach({
        ...formKeHoach,
        hocPhan_id: parseInt(maHP),
        hocPhan: hocPhan,
      });
    }
  }, [maHP]);

  //xu ly luu edit ke hoach
  const onSave = () => {
    // Validate form data here
    if (!formKeHoach.hocPhan_id || !formKeHoach.khoa) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    //phan cua backend
    let index = keHoachMoNhomData.findIndex(item => item.id == keHoach.id);
    if (index !== -1) {
      keHoachMoNhomData.splice(index, 1, formKeHoach);
      console.log('formKeHoach', formKeHoach);
    }

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Sửa kế hoạch mới</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-3">
            <label className="block text-sm font-medium mb-1">Tên học phần</label>
            <select
              type="text"
              name="tenHocPhan"
              defaultValue={formKeHoach.hocPhan?.id || ''}
              onChange={e => setMaHP(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn học phần</option>
              {hocPhanData.map(item => (
                <option key={item.id} value={item.id}>
                  {item.id} - {item.tenHP}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tín chỉ</label>
            <input
              type="number"
              name="soTinChi"
              value={formKeHoach.hocPhan?.soTinChi || ''}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Khoa</label>
            <input
              type="text"
              name="khoa"
              value={formKeHoach.khoa}
              onChange={e => setFormKeHoach({ ...formKeHoach, khoa: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết LT</label>
            <input
              type="number"
              name="soTiet.LT"
              value={formKeHoach.hocPhan?.soTietLT || 0}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết TT</label>
            <input
              type="number"
              name="soTiet.BT"
              value={formKeHoach.hocPhan?.soTietBT || 0}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết TH</label>
            <input
              type="number"
              name="soTiet.TH"
              value={formKeHoach.hocPhan?.soTietTH || 0}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết TC</label>
            <input
              type="number"
              name="soTiet.TC"
              value={formKeHoach.hocPhan?.soTietLT || 0}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hệ số HP</label>
            <input
              type="number"
              step="0.01"
              name="heSoHP"
              value={formKeHoach.heSo || 0}
              onChange={e => setFormKeHoach({ ...formKeHoach, heSo: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tổng số nhóm</label>
            <input
              type="number"
              name="tongSoNhom"
              value={formKeHoach.tongSoNhom || 0}
              onChange={e =>
                setFormKeHoach({ ...formKeHoach, tongSoNhom: parseInt(e.target.value) })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số sinh viên</label>
            <input
              type="number"
              name="soSinhVien"
              value={formKeHoach.tongSoSinhVien || 0}
              onChange={e => setFormKeHoach({ ...formKeHoach, tongSoSinhVien: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditKeHoachModal;
