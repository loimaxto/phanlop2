import React, { useEffect, useState } from 'react';

import HocPhanService from '@services/HocPhanService.js';


export default function EditHocPhanModal({ isOpen, onClose, hocPhanObject }) {

  const [tenHocPhan, setTenHocPhan] = useState(null);
  const [soTinChi, setSoTinChi] = useState(0);
  const [tietBaiTap, setTietBaiTap] = useState(0);
  const [soTietLyThuyet, setSoTietLyThuyet] = useState(0);
  const [soTietThucHanh, setSoTietThucHanh] = useState(0);
  const [hocPhanTienQuyet, setHocPhanTienQuyet] = useState(null);
  const [maHocPhan, setMaHocPhan] = useState(null);

  useEffect(() => {
    if (hocPhanObject) {
      setTenHocPhan(hocPhanObject.tenHocPhan || null);
      setSoTinChi(hocPhanObject.soTinChi || 0);
      setTietBaiTap(hocPhanObject.soTietBaiTap || 0);
      setSoTietLyThuyet(hocPhanObject.soTietLyThuyet || 0);
      setSoTietThucHanh(hocPhanObject.soTietThucHanh || 0);
      setHocPhanTienQuyet(hocPhanObject.maHocPhanTruoc || null);
      setMaHocPhan(hocPhanObject.maHocPhan || null);
    }
  }, [hocPhanObject, isOpen]);


  const handleEdit = async () => {
    const newHocPhan = {
      "maHocPhan": maHocPhan,
      "tenHocPhan": tenHocPhan,
      "soTinChi": parseInt(soTinChi),
      "soTietLyThuyet": parseInt(soTietLyThuyet),
      "soTietBaiTap": parseInt(tietBaiTap),
      "soTietThucHanh": parseInt(soTietThucHanh),
      "maHocPhanTruoc": hocPhanTienQuyet == ''? null : hocPhanTienQuyet,
    };
    console.log(newHocPhan)
    try {
      const response = await HocPhanService.updateHocPhan(newHocPhan, hocPhanObject.id);

      if (response == null) {
        console.log('Lỗi khi tạo học phần');
      } else {
        console.log('Học phần đã được tạo:', response);
        onClose();
      }

    } catch (error) {
      console.error('Lỗi khi tạo học phần:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay bg-blend-screen modal opacity-100 duration-300">
      <div className="modal-dialog opacity-100 duration-300">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Sửa học phần</h3>
            <button
              onClick={onClose}
              type="button"
              className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            >
              <span className="icon-[tabler--x] size-4"></span>
            </button>
          </div>
          <div className="modal-body items-center">
            <div className="w-full">
              <label className="label-text" htmlFor="input-ma-hp">
                Mã học phần
              </label>
              <input
                type="text"
                placeholder="Nhập mã học phần"
                className="input"
                id="input-ma-hp"
                value={maHocPhan}
                onChange={(e) => setMaHocPhan(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="label-text" htmlFor="input-ma-hp">
                Tên học phần
              </label>
              <input
                type="text"
                placeholder="Nhập tên học phần"
                className="input"
                id="input-ten-hp"
                value={tenHocPhan}
                onChange={(e) => setTenHocPhan(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="max-w-32">
                <label className="label-text" htmlFor="so-tinh-chi">
                  Số tính chỉ:
                </label>
                <div className="input items-center">
                  <input
                    className="text-center"
                    type="number"
                    min="0"
                    id="so-tinh-chi"
                    value={soTinChi}
                    onChange={(e) => setSoTinChi(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-w-32">
                <label className="label-text" htmlFor="tiet-bai-tap">
                  Số tiết bài tập:
                </label>
                <div className="input items-center">
                  <input
                    className="text-center"
                    type="number"
                    min="0"
                    id="tiet-bai-tap"
                    value={tietBaiTap}
                    onChange={(e) => setTietBaiTap(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="max-w-32">
                <label className="label-text" htmlFor="tiet-ly-thuyet">
                  Số tiết lý thuyết:
                </label>
                <div className="input items-center">
                  <input
                    className="text-center"
                    type="number"
                    min="0"
                    id="tiet-ly-thuyet"
                    value={soTietLyThuyet}
                    onChange={(e) => setSoTietLyThuyet(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-w-32">
                <label className="label-text" htmlFor="tiet-thuc-hanh">
                  Số tiết thực hành:
                </label>
                <div className="input items-center">
                  <input
                    className="text-center"
                    type="number"
                    min="0"
                    id="tiet-thuc-hanh"
                    value={soTietThucHanh}
                    onChange={(e) => setSoTietThucHanh(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="label-text" htmlFor="input-hp-tien-quyet">
                Học phần tiên quyết
              </label>
              <input
                type="text"
                placeholder="Nhập học phần tiên quyết (nếu có)"
                className="input"
                id="input-hp-tien-quyet"
                value={hocPhanTienQuyet}
                onChange={(e) => setHocPhanTienQuyet(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} type="button" className="btn btn-soft btn-secondary">
              Hủy
            </button>
            <button onClick={handleEdit} type="button" className="btn btn-primary">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}