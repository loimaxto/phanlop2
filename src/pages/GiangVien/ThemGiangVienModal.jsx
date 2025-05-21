import React, { useEffect, useState } from 'react';
import { getListAll } from '@/services/NganhService';
import { createGiangVien } from '@/services/GiangVienService';

const ThemGiangVienModal = ({ isOpen, onClose, onSave }) => {
  const [users, setUsers] = useState([]);
  const [nganhList, setNganhList] = useState([]);

  const [newGiangVien, setNewGiangVien] = useState({
    userId: '',
    ten: '',
    namSinh: '',
    chucDanh: '',
    khoa: '',
    boMon: '',
    chuyenMon: '',
    trinhDo: '',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [userRes, nganhListData] = await Promise.all([
          fetch('http://localhost:8080/api/v1/user'),
          getListAll().then(res => res.data),
        ]);
        const usersData = await userRes.json();
        setUsers(Array.isArray(usersData) ? usersData : usersData.data || []);
        setNganhList(nganhListData || []);
      } catch (err) {
        console.error('Lỗi khi fetch dữ liệu:', err);
      }
    };

    if (isOpen) fetchOptions();
  }, [isOpen]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewGiangVien(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { userId, ten, namSinh, chucDanh, khoa, boMon, chuyenMon, trinhDo } = newGiangVien;

    if (!userId || !ten || !namSinh || !chucDanh || !khoa || !boMon || !chuyenMon || !trinhDo) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const payload = {
        ...newGiangVien,
        namSinh: parseInt(namSinh, 10),
        userId: parseInt(userId),
      };

      const data = await createGiangVien(payload);
      alert('Thêm giảng viên thành công!');
      onSave(data);
      onClose();
      setNewGiangVien({
        userId: '',
        ten: '',
        namSinh: '',
        chucDanh: '',
        khoa: '',
        boMon: '',
        chuyenMon: '',
        trinhDo: '',
      });
      window.location.reload();
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
      alert(err.response?.data?.message || 'Không thể kết nối đến server.');
    }
  };

  if (!isOpen) return null;

  const usersActive = users.filter(user => user.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
        <h3 className="text-xl font-bold mb-4">Thêm Giảng Viên Mới</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">User</label>
            <select
              name="userId"
              value={newGiangVien.userId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              {usersActive.length > 0 ? (
                <>
                  <option value="" disabled>
                    Chọn user
                  </option>
                  {usersActive.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.username} - {user.email}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">Chưa có tài khoản nào khả dụng</option>
              )}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Tên Giảng Viên</label>
            <input
              type="text"
              name="ten"
              value={newGiangVien.ten}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Năm Sinh</label>
            <input
              type="number"
              name="namSinh"
              value={newGiangVien.namSinh}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Chức Danh</label>
            <input
              type="text"
              name="chucDanh"
              value={newGiangVien.chucDanh}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Khoa</label>
            <input
              type="text"
              name="khoa"
              value={newGiangVien.khoa}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bộ Môn</label>
            <select
              name="boMon"
              value={newGiangVien.boMon}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Chọn ngành</option>
              {nganhList.map(nganh => (
                <option key={nganh.id} value={nganh.tenNganh}>
                  {nganh.tenNganh}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Chuyên Môn (Ngành)</label>
            <input
              type="text"
              name="chuyenMon"
              value={newGiangVien.chuyenMon}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Trình Độ</label>
            <input
              type="text"
              name="trinhDo"
              value={newGiangVien.trinhDo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={onClose}>
            Huỷ
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemGiangVienModal;
