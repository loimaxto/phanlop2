import React, { useState, useEffect } from 'react';

const GiangVienEditModal = ({ giangVien, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    ten: giangVien.ten,
    namSinh: giangVien.namSinh,
    chucDanh: giangVien.chucDanh,
    trinhDo: giangVien.trinhDo,
  });

useEffect(() => {
  console.log("🟢 Modal mở - dữ liệu ban đầu:", formData);
}, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
  };

  const handleSubmit = async () => {
    const confirmUpdate = window.confirm("Bạn có chắc muốn cập nhật thông tin này?");
    if (!confirmUpdate) return;

    try {
      const res = await fetch(`http://localhost:8080/api/giangvien/${giangVien.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Cập nhật thành công!");
        window.location.reload(); 
        onClose();     // đóng modal
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      alert("Lỗi khi cập nhật: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 bg-opacity-50 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Chỉnh sửa giảng viên</h2>
        
        <div className="space-y-3">
          <input
            type="text"
            name="ten"
            value={formData.ten}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Họ tên giảng viên"
          />
          <input
            type="number"
            name="namSinh"
            value={formData.namSinh}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Năm sinh"
          />
          <input
            type="text"
            name="chucDanh"
            value={formData.chucDanh}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Chức danh, học vị"
          />
          <input
            type="text"
            name="trinhDo"
            value={formData.trinhDo}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Trình độ"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-outline" onClick={onClose}>Huỷ</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default GiangVienEditModal;
