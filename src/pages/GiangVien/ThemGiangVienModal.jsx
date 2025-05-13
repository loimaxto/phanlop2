import React, { useEffect, useState } from 'react';

const ThemGiangVienModal = ({ isOpen, onClose, onSave }) => {
  const [users, setUsers] = useState([]);
  const [nganhList, setNganhList] = useState([]);

  const [newGiangVien, setNewGiangVien] = useState({
    userId: '',
    tenGV: '',
    namSinh: '',
    chucDanh: '',
    khoa: '',
    boMon: '',
    chuyenMon: '',
    trinhDo: ''
  });

  // Fetch user & ngành khi modal mở
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [userRes, nganhRes] = await Promise.all([
          fetch('http://localhost:5000/api/user'),
          fetch('http://localhost:5000/api/nganh')
        ]);
        const usersData = await userRes.json();
        const nganhData = await nganhRes.json();

        setUsers(usersData);
        setNganhList(nganhData);
      } catch (err) {
        console.error('Lỗi khi fetch dữ liệu:', err);
      }
    };

    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGiangVien(prev => ({ ...prev, [name]: value }));
  };

const handleSave = async () => {
  const {
    userId,
    tenGV,
    namSinh,
    chucDanh,
    khoa,
    boMon,
    chuyenMon,
    trinhDo
  } = newGiangVien;

  // Kiểm tra thiếu trường
  if (!userId || !tenGV || !namSinh || !chucDanh || !khoa || !boMon || !chuyenMon || !trinhDo) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/giangvien/them', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGiangVien)
    });

    const data = await res.json();

    if (res.ok) {
      alert('Thêm giảng viên thành công!');
      window.location.reload(); 
      onSave(data); // gọi callback nếu có
      onClose();
      setNewGiangVien({
        userId: '',
        tenGV: '',
        namSinh: '',
        chucDanh: '',
        khoa: '',
        boMon: '',
        chuyenMon: '',
        trinhDo: ''
      });
    } else {
      alert(data.message || 'Có lỗi xảy ra khi thêm giảng viên.');
    }
  } catch (err) {
    console.error('Lỗi khi gọi API:', err);
    alert('Không thể kết nối đến server.');
  }
};


  if (!isOpen) return null;

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
              <option value="">Chọn user</option>
              {users.map(user => (
                <option key={user.userName} value={user.id}>
                  {user.userName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Tên Giảng Viên</label>
            <input
              type="text"
              name="tenGV"
              value={newGiangVien.tenGV}
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
            <input
              type="text"
              name="boMon"
              value={newGiangVien.boMon}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Chuyên Môn (Ngành)</label>
            <select
              name="chuyenMon"
              value={newGiangVien.chuyenMon}
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
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
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
