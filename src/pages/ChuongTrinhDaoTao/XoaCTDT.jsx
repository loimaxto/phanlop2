import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteThongTinChung } from '@services/ThongTinChungService';

function XoaCTDT({ id, isOpen, onClose }) {
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteThongTinChung(id);
      if (response.statusCode === 200) {
        toast.success('Xóa chương trình đào tạo thành công!');
        onClose();
      } else {
        toast.error(response.message || 'Xóa thất bại!');
      }
    } catch (error) {
      toast.error('Lỗi khi gửi yêu cầu xóa!');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa CTĐT (Mã - {id}) này?</p>
        <div className="flex justify-center gap-4 mt-6">
          <button className="btn btn-outline" onClick={onClose}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={handleConfirmDelete}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default XoaCTDT;
