import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getPhanCongByGiangVienId } from '@/services/GiangVienService';
const GiangVienDetailsModal = ({ giangVien, onClose }) => {
  const [phanCongList, setPhanCongList] = useState([]);

  useEffect(() => {
    const fetchPhanCong = async () => {
      if (!giangVien?.id) return;

      try {
        const data = await getPhanCongByGiangVienId(giangVien.id);
        setPhanCongList(data);
      } catch (err) {
        console.error('Lỗi khi gọi API phân công:', err);
      }
    };

    fetchPhanCong();
  }, [giangVien]);

  if (!giangVien) return null;

  return (
    <div className="p-4 border-2 rounded-xl shadow-md bg-white mt-6 fixed inset-20 bg-opacity-50 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={onClose}>
          X
        </Button>
        <div className="text-lg font-semibold">
          Giảng viên: <strong>{giangVien.ten}</strong>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">Phân công giảng dạy</h2>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th rowSpan="2" className="border p-2">
                Tên Học phần
              </th>
              <th rowSpan="2" className="border p-2">
                Mã học phần
              </th>
              <th rowSpan="2" className="border p-2">
                Số TC
              </th>
              <th rowSpan="2" className="border p-2">
                Số tiết của HP
              </th>
              <th className="border p-2">Số lượng lớp nhóm</th>
              <th colSpan="3" className="border p-2">
                Giảng dạy ở học kì
              </th>
              <th rowSpan="2" className="border p-2">
                Tổng số tiết giảng dạy
              </th>
              <th rowSpan="2" className="border p-2">
                Công tác khác
              </th>
              <th rowSpan="2" className="border p-2">
                Tổng CLC
              </th>
              <th rowSpan="2" className="border p-2">
                Tổng Số tiết cộng tác
              </th>
            </tr>
            <tr className="bg-gray-100">
              <th className="border p-2">DH</th>
              <th className="border p-2">1</th>
              <th className="border p-2">2</th>
              <th className="border p-2">3</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {phanCongList.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.tenHP}</td>
                <td className="border p-2">{item.maHP}</td>
                <td className="border p-2">{item.soTinChi}</td>
                <td className="border p-2">{item.soTiet}</td>
                <td className="border p-2">
                  {Number(item.hk1) + Number(item.hk2) + Number(item.hk3)}
                </td>
                <td className="border p-2">{item.hk1}</td>
                <td className="border p-2">{item.hk2}</td>
                <td className="border p-2">{item.hk3}</td>
                <td className="border p-2">
                  {(Number(item.hk1) + Number(item.hk2) + Number(item.hk3)) * Number(item.soTiet)}
                </td>
                {index === 0 && (
                  <>
                    <td rowSpan={phanCongList.length} className="border p-2"></td>
                    <td rowSpan={phanCongList.length} className="border p-2"></td>
                    <td rowSpan={phanCongList.length} className="border p-2"></td>
                  </>
                )}
              </tr>
            ))}
            <tr className="font-semibold text-center bg-gray-100">
              <td colSpan="8" className="border p-2 text-center font-bold">
                Tổng cộng
              </td>
              <td className="border p-2">
                {phanCongList.reduce(
                  (sum, item) =>
                    sum +
                    (Number(item.hk1) + Number(item.hk2) + Number(item.hk3)) * Number(item.soTiet),
                  0
                )}
              </td>
              <td className="border p-2 font-bold" rowSpan="1">
                {' '}
                {/* Hoặc để trống nếu bạn không cần tính */}0
              </td>
              <td className="border p-2 font-bold" rowSpan="1">
                0
              </td>
              <td className="border p-2 font-bold" rowSpan="1">
                {phanCongList.reduce(
                  (sum, item) =>
                    sum +
                    (Number(item.hk1) + Number(item.hk2) + Number(item.hk3)) * Number(item.soTiet),
                  0
                )}
              </td>
            </tr>

            {phanCongList.length === 0 && (
              <tr>
                <td colSpan="12" className="border p-4 text-center text-gray-500">
                  Không có dữ liệu phân công
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GiangVienDetailsModal;
