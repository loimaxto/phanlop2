import React, { useState, useEffect } from 'react';
import { getListNganh, createNganh, updateNganh, deleteNganh } from '@services/NganhService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Nganh({ isOpen, onClose }) {
  const [industries, setIndustries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [meta, setMeta] = useState({ totalPage: 0, totalElement: 0 });

  const fetchData = async (page, size) => {
    const response = await getListNganh({ page, size });
    setIndustries(response.data);
    setMeta(response.metadata);
  };

  useEffect(() => {
    if (isOpen) {
      fetchData(currentPage, pageSize);
    }
  }, [isOpen, currentPage, pageSize]);

  const handleSubmitCreateNew = async data => {
    const response = await createNganh(data);
    if (response.statusCode === 201) {
      toast.success(response?.message || 'Tạo ngành thành công!');
      setIsModalOpen(false);
      fetchData(currentPage, pageSize);
    } else {
      toast.error(response?.message || 'Tạo ngành thất bại!');
    }
  };

  const handleReset = async () => {
    setCurrentPage(0);
    setPageSize(5);
    await fetchData(0, 5);
  };

  const handleEdit = item => {
    setEditData(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditData(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateIndustry = async e => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      ...editData,
      maNganh: form.maNganh.value,
      tenNganh: form.tenNganh.value,
    };
    const response = await updateNganh(updated.id, updated);
    if (response.statusCode === 201) {
      toast.success(response?.message || 'Cập nhật ngành thành công!');
      handleCloseEditModal();
      fetchData(currentPage, pageSize);
    } else {
      toast.error(response?.message || 'Cập nhật ngành thất bại!');
    }
  };

  const handleDelete = id => {
    setDeleteId(id);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const response = await deleteNganh(deleteId);
    if (response.statusCode === 201) {
      setDeleteId(null);
      setIsConfirmDeleteOpen(false);
      toast.success(response?.message || 'Xóa ngành thành công!');
      fetchData(currentPage, pageSize);
    } else {
      toast.error(response?.message || 'Xóa ngành thất bại!');
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setIsConfirmDeleteOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button className="absolute top-2 right-2 text-red-600 font-bold text-xl" onClick={onClose}>
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">Danh sách ngành đào tạo</h1>

        <div className="flex justify-end mb-4">
          <button className="btn btn-primary mr-2" onClick={() => setIsModalOpen(true)}>
            Tạo mới ngành
          </button>
          <button className="btn btn-primary" onClick={handleReset}>
            Reset
          </button>
        </div>

        <table className="table w-full mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã ngành</th>
              <th>Tên ngành</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {industries.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.maNganh}</td>
                <td>{item.tenNganh}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>
                    Sửa
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            Trước
          </button>
          <span>
            Trang {currentPage + 1} / {meta.totalPage}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage(p => Math.min(p + 1, meta.totalPage - 1))}
            disabled={currentPage + 1 === meta.totalPage}
          >
            Tiếp
          </button>
        </div>

        {/* Modal tạo mới */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">Tạo ngành mới</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const form = e.target;
                  const maNganh = form.maNganh.value;
                  const tenNganh = form.tenNganh.value;
                  handleSubmitCreateNew({ maNganh, tenNganh });
                }}
              >
                <div className="mb-3">
                  <label className="label-text">Mã ngành</label>
                  <input className="input w-full" name="maNganh" required />
                </div>
                <div className="mb-3">
                  <label className="label-text">Tên ngành</label>
                  <input className="input w-full" name="tenNganh" required />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-success">
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal sửa */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">Sửa ngành</h2>
              <form onSubmit={handleUpdateIndustry}>
                <div className="mb-3">
                  <label className="label-text">Mã ngành</label>
                  <input
                    className="input w-full"
                    name="maNganh"
                    defaultValue={editData?.maNganh}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="label-text">Tên ngành</label>
                  <input
                    className="input w-full"
                    name="tenNganh"
                    defaultValue={editData?.tenNganh}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={handleCloseEditModal} className="btn btn-outline">
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-success">
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal xác nhận xóa */}
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
              <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
              <p>Bạn có chắc chắn muốn xóa ngành này?</p>
              <div className="flex justify-center gap-4 mt-6">
                <button className="btn btn-outline" onClick={cancelDelete}>
                  Hủy
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nganh;
