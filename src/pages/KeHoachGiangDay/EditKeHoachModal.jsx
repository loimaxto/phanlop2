'use client';
import { hocPhanData, keHoachGiangDayData } from '../../dumpData';
import { useState, useEffect } from 'react';

const EditKeHoachModal = ({ isOpen, onClose, keHoach, refresh }) => {
  if (!isOpen || !keHoach) return null;

  const [maHP, setMaHP] = useState(keHoach.maHP || keHoach.hocPhan?.maHP || '');
  const [formKeHoach, setFormKeHoach] = useState({
    maHP: keHoach.maHP || '',
    tenHocPhan: keHoach.tenHocPhan || '',
    soTinChi: keHoach.soTinChi || 0,
    soTietLyThuyet: keHoach.soTietLyThuyet || 0,
    soTietThucTap: keHoach.soTietThucTap || 0,
    soTietThucHanh: keHoach.soTietThucHanh || 0,
    soTietTong: keHoach.soTietTong || 0,
    khoa: keHoach.khoa || '',
    heSoHP: keHoach.heSoHP || 0,
    tongSoNhom: keHoach.tongSoNhom || 0,
    slsvNhom: keHoach.slsvNhom || 0,
    phanCong: keHoach.phanCong || [],
  });

  //xu ly thay doi maHP
  useEffect(() => {
    let hocPhan = hocPhanData.find(item => item.maHP == maHP);
    if (hocPhan) {
      setFormKeHoach({
        ...formKeHoach,
        maHP: maHP,
        tenHocPhan: hocPhan.tenHocPhan,
        soTinChi: hocPhan.soTinChi,
        soTietLyThuyet: hocPhan.soTietLyThuyet,
        soTietThucTap: hocPhan.soTietThucTap,
        soTietThucHanh: hocPhan.soTietThucHanh,
        soTietTong: hocPhan.soTietTong,
      });
    }
  }, [maHP]);

  //xu ly luu edit ke hoach
  const onSave = () => {
    // Validate form data here
    if (!formKeHoach.maHP || !formKeHoach.khoa) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    //phan cua backend
    let keHoachData = keHoachGiangDayData.find(item => item.id == keHoach.id);
    if (keHoachData) {
      keHoachData.maHP = formKeHoach.maHP;
      keHoachData.hocPhan = hocPhanData.find(item => item.maHP == formKeHoach.maHP);
      keHoachData.khoa = formKeHoach.khoa;
      keHoachData.heSoHP = parseFloat(formKeHoach.heSoHP);
      keHoachData.tongSoNhom = formKeHoach.tongSoNhom;
      keHoachData.slsvNhom = formKeHoach.slsvNhom;
      keHoachData.phanCong = formKeHoach.phanCong;
    }

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Sửa kế hoạch {keHoach?.id}</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-3">
            <label className="block text-sm font-medium mb-1">Tên học phần</label>
            <select
              type="text"
              name="tenHocPhan"
              value={formKeHoach.maHP || ''}
              onChange={e => setMaHP(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn học phần</option>
              {hocPhanData.map(item => (
                <option key={item.tenHocPhan} value={item.maHP}>
                  {item.maHP} - {item.tenHocPhan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tín chỉ</label>
            <input
              type="number"
              name="soTinChi"
              value={formKeHoach.soTinChi}
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
              value={formKeHoach.soTietLyThuyet || 0}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết TT</label>
            <input
              type="number"
              name="soTiet.BT"
              value={formKeHoach.soTietThucTap || 0}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết TH</label>
            <input
              type="number"
              name="soTiet.TH"
              value={formKeHoach.soTietThucHanh || 0}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết TC</label>
            <input
              type="number"
              name="soTiet.TC"
              value={formKeHoach.soTietTong || 0}
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
              value={formKeHoach.heSoHP || 0}
              onChange={e => setFormKeHoach({ ...formKeHoach, heSoHP: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tổng số nhóm</label>
            <input
              type="number"
              name="tongSoNhom"
              value={formKeHoach.tongSoNhom || 0}
              onChange={e => setFormKeHoach({ ...formKeHoach, tongSoNhom: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SLSV/Nhóm</label>
            <input
              type="number"
              name="slsvNhom"
              value={formKeHoach.slsvNhom || 0}
              onChange={e => setFormKeHoach({ ...formKeHoach, slsvNhom: e.target.value })}
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
