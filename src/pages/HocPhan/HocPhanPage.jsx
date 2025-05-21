import { useEffect, useState } from 'react';
import CreateHocPhanModal from './CreateHocPhanModal';
import EditHocPhanModal from './EditHocPhanModal';
import HocPhanService from '@services/HocPhanService.js';

export default function HocPhanPage() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentHocPhanObject, setCurrentHocPhanObject] = useState(null);
  const [hocPhanList, setHocPhanList] = useState([]);
  const [searchMaHocPhan, setSearchMaHocPhan] = useState('');
  const [searchTenHocPhan, setSearchTenHocPhan] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchHocPhan();
  }, [isOpenCreate, isOpenEdit]);

  useEffect(() => {
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  }, [searchMaHocPhan, searchTenHocPhan]);

  const fetchHocPhan = async () => {
    try {
      const data = await HocPhanService.getAll();
      setHocPhanList(data);
      console.log('Dữ liệu học phần đã được tải:', data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu học phần:', error);
    }
  };

  const filteredHocPhanList = hocPhanList.filter(
    hp =>
      hp.maHocPhan.toLowerCase().includes(searchMaHocPhan.toLowerCase()) &&
      hp.tenHocPhan.toLowerCase().includes(searchTenHocPhan.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHocPhanList.length / itemsPerPage);
  const paginatedHocPhanList = filteredHocPhanList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenCreate = () => setIsOpenCreate(true);
  const handleCloseCreate = () => setIsOpenCreate(false);
  const handleCloseEdit = () => setIsOpenEdit(false);

  const handleChooseEdit = hocphanObject => {
    console.log(hocphanObject);
    setCurrentHocPhanObject(hocphanObject);
    setIsOpenEdit(true);
  };

  const handleDeleteHocPhan = async hocPhanId => {
    const result = window.confirm('Bạn có chắc chắn xóa?');
    if (result) {
      try {
        await HocPhanService.deleteHocPhan(hocPhanId);
        await fetchHocPhan();
      } catch (error) {
        console.error('Lỗi khi xóa học phần:', error);
      }
    }
  };

  if (hocPhanList == null) return <>Lỗi lấy dữ liệu học phần</>;

  return (
    <div className="container h-full">
      <div className="flex items-center justify-between mb-4">
        <h1>Danh mục chương trình đào tạo</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpenCreate}
            type="button"
            className="btn btn-primary"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="modal-create-hoc-phan"
            data-overlay="#modal-create-hoc-phan"
          >
            Tạo học phần
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            className="input w-60"
            placeholder="Tìm theo mã học phần"
            value={searchMaHocPhan}
            onChange={e => setSearchMaHocPhan(e.target.value)}
          />
          <input
            type="text"
            className="input w-60"
            placeholder="Tìm theo tên học phần"
            value={searchTenHocPhan}
            onChange={e => setSearchTenHocPhan(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto h-[400px]">
          <table className="table">
            <thead className="text-center">
              <tr>
                <th className="border" rowSpan="2">
                  Mã HP
                </th>
                <th className="border" rowSpan="2">
                  Tên Học phần
                </th>
                <th className="border" rowSpan="2">
                  Số tín chỉ
                </th>
                <th className="border" rowSpan="2">
                  Hệ số
                </th>
                <th className="border" colSpan="4">
                  Số tiết dạy học
                </th>

                <th className="border" rowSpan="2">
                  Hành động
                </th>
              </tr>
              <tr>
                <th className="border">Lý thuyết</th>
                <th className="border">Thực hành</th>
                <th className="border">Bài tập</th>
                <th className="border">Tổng</th>
              </tr>
            </thead>
            <tbody id="ks-list">
              {paginatedHocPhanList.map((hocPhan, index) => (
                <tr key={index} className="text-center">
                  <td className="text-nowrap">{hocPhan.maHocPhan}</td>
                  <td>{hocPhan.tenHocPhan}</td>
                  <td>{hocPhan.soTinChi}</td>
                  <td>{hocPhan.heSo}</td>
                  <td>{hocPhan.soTietLyThuyet}</td>
                  <td>{hocPhan.soTietThucHanh}</td>
                  <td>{hocPhan.soTietBaiTap}</td>
                  <td>{hocPhan.soTietTongCong}</td>
                  <td>
                    <button
                      className="btn btn-circle btn-text btn-sm"
                      onClick={() => handleChooseEdit(hocPhan)}
                    >
                      <span className="icon-[tabler--pencil] size-5"></span>
                    </button>
                    <button
                      className="btn btn-circle btn-text btn-sm"
                      onClick={() => handleDeleteHocPhan(hocPhan.id)}
                    >
                      <span className="icon-[tabler--trash] size-5"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginatedHocPhanList.length > 0 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        )}
      </div>

      <CreateHocPhanModal isOpen={isOpenCreate} onClose={handleCloseCreate} />
      <EditHocPhanModal
        isOpen={isOpenEdit}
        onClose={handleCloseEdit}
        hocPhanObject={currentHocPhanObject}
      />
    </div>
  );
}
