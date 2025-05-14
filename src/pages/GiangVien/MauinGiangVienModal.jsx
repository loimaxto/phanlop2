import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const MauinGiangVienModal = ({ show, onClose }) => {
  const [nganhList, setNganhList] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState('');
  const [giangVienData, setGiangVienData] = useState([]);

  useEffect(() => {
    const fetchNganhList = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/nganh');
        const data = await res.json();
        setNganhList(data);
        if (data.length > 0) {
          setSelectedNganh(data[0].tenNganh);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngành:', error);
      }
    };

    if (show) {
      fetchNganhList();
    }
  }, [show]);

  const handleExport = async () => {
    // Lấy dữ liệu giảng viên theo khoa đã chọn
    try {
      const encodedNganh = encodeURIComponent(selectedNganh);
      const res = await fetch(`http://localhost:5000/api/phanconggiangday/khoa/${encodedNganh}`);
      const data = await res.json();

      // Tạo dữ liệu theo yêu cầu (mỗi giảng viên với nhóm của họ)
      const formattedData = data.map(giangVien => ({
        giangVienId: giangVien.GiangVienID,
        tenGV: giangVien.TenGV,
        namSinh: giangVien.NamSinh,
        chucDanh: giangVien.ChucDanh,
        khoa: giangVien.khoa,
        hocPhan: data.filter(item => item.GiangVienID === giangVien.GiangVienID).map(item => ({
          MAHP: item.MAHP,
          TenHP: item.TenHP,
          SoTC: item.SoTC,
          SoTiet: item.SoTiet,
          hocKi: [
            { hocKi: 1, soTiet: item.hk1 },
            { hocKi: 2, soTiet: item.hk2 },
            { hocKi: 3, soTiet: item.hk3 }
          ]
        }))
      }));

      // Cập nhật state giangVienData với dữ liệu đã xử lý
      setGiangVienData(formattedData);

      // Log data dưới dạng JSON để xuất
      console.log(JSON.stringify(formattedData, null, 2));

      // Hiển thị thông báo
      alert(`Đã xuất mẫu in cho ngành: ${selectedNganh}`);
      onClose();
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-center">Xuất mẫu in theo ngành</h3>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Chọn ngành</label>
          <select
            className="select select-bordered w-full"
            value={selectedNganh}
            onChange={(e) => setSelectedNganh(e.target.value)}
          >
            {nganhList.map((nganh) => (
              <option key={nganh.tenNganh} value={nganh.tenNganh}>
                {nganh.tenNganh}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>Huỷ</button>
          <button className="btn btn-primary" onClick={handleExport}>Export</button>
        </div>
      </div>
    </div>
  );
};

export default MauinGiangVienModal;
