import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CreateCurriculumModal from './CreateCurriculumPage';
import Nganh from './Nganh';
import UpdateCTDT from './UpdateCTDT';
import XoaCTDT from './XoaCTDT';
import CTKhung from './CTKhung';
import { getListThongTinChung } from '@services/ThongTinChungService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CurriculumPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ totalPage: 0, totalElement: 0 });
  const [search, setSearch] = useState('');

  const [openCreateCTDT, setOpenCreateCTDT] = useState(false);
  const [showNganhModal, setShowNganhModal] = useState(false);
  const [isModalOpenUpdateCTDT, setOpenModalUpdateCTDT] = useState(false);
  const [selectedCTDTId, setSelectedCTDTId] = useState();
  const [isModalOpenDeleteCTDT, setOpenModalDeleteCTDT] = useState(false);
  const [isModalOpenCTKhung, setOpenModalCTKhung] = useState(false);

  useEffect(() => {
    fetchData(currentPage, pageSize, search);
  }, [currentPage, pageSize, search]);

  const fetchData = async (page, size, search) => {
    try {
      const response = await getListThongTinChung({ page, size, search });
      console.log('Get list CTDT: ', response);
      setRows(response.data);
      setMeta(response.metadata);
    } catch (error) {
      toast.error('Không thể tải dữ liệu chương trình đào tạo!');
    }
  };

  const handleResetCTDT = async () => {
    try {
      setPageSize(5);
      setCurrentPage(0);
      await fetchData(0, 5); // reset về page 0 với size 5
    } catch (error) {
      toast.error('Có lỗi xảy ra khi reset danh sách.');
    }
  };

  const columns = [
    { id: 'id', label: 'Mã CTDT', minWidth: '5%', fontWeight: 'bold', align: 'center' },
    { id: 'banHanh', label: 'Ban Hành', minWidth: '10%', align: 'center' },
    { id: 'khoaQuanLy', label: 'Khoa Quản Lý', minWidth: '10%', align: 'center' },
    { id: 'nganh', label: 'Ngành', minWidth: '15%', align: 'center' },
    { id: 'loaiBang', label: 'Loại Bằng', minWidth: '10%', align: 'center' },
    { id: 'loaiHinhDaoTao', label: 'Loại Hình Đào Tạo', minWidth: '15%', align: 'center' },
    { id: 'tongTinChi', label: 'Tổng Tín Chỉ', minWidth: '5%', align: 'center' },
    { id: 'thoiGianDaoTao', label: 'Thời Gian Đào Tạo', minWidth: '5%', align: 'center' },
    { id: 'ngonNgu', label: 'Ngôn Ngữ', minWidth: '15%', align: 'center' },
    { id: 'website', label: 'Website', minWidth: '10%', align: 'center' },
    { id: 'status', label: 'Status', minWidth: '5%', align: 'center' },
  ];

  return (
    <div className="container h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1>Danh mục chương trình đào tạo</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="input input-bordered px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="btn btn-soft btn-gradient text-white"
            onClick={() => setShowNganhModal(true)}
          >
            Ngành đào tạo
          </button>
          <button
            className="btn btn-soft btn-gradient text-white"
            onClick={() => setOpenCreateCTDT(true)}
          >
            Tạo mới chương trình đào tạo
          </button>
          <button
            className="btn btn-soft btn-gradient text-white"
            onClick={() => handleResetCTDT()}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="flex-grow overflow-y-auto border rounded max-h-[450px]">
        <table className="table-none md:table-fixed w-full">
          <thead className="text-center sticky top-0 bg-white z-[1]">
            <tr>
              {columns.map(column => (
                <th
                  key={column.id}
                  className="border p-2"
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: column.fontWeight || 'normal',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                >
                  {column.label}
                </th>
              ))}
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="text-center">
                {columns.map(column => (
                  <td
                    key={column.id}
                    className="border p-2"
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {column.id === 'nganh'
                      ? row.nganh.tenNganh
                      : column.id === 'status'
                      ? row[column.id]
                        ? 'Active'
                        : 'Unactive'
                      : row[column.id]}
                  </td>
                ))}
                <td className="border p-2">
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Xem"
                    onClick={() => {
                      setSelectedCTDTId(row.id);
                      setOpenModalCTKhung(true);
                    }}
                  >
                    <span className="icon-[mdi--file-document-box-search-outline] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Sửa"
                    onClick={() => {
                      setSelectedCTDTId(row.id);
                      setOpenModalUpdateCTDT(true);
                    }}
                  >
                    <span className="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Xóa"
                    onClick={() => {
                      setSelectedCTDTId(row.id);
                      setOpenModalDeleteCTDT(true);
                    }}
                    disabled={!row.status}
                  >
                    <span className="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2">Số hàng mỗi trang:</label>
          <select
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            {[5, 10, 20].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="pagination">
          <button
            className="btn btn-soft btn-primary"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage + 1 === 1}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage + 1} of {meta.totalPage}
          </span>
          <button
            className="btn btn-soft btn-primary"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta.totalPage - 1))}
            disabled={currentPage + 1 === meta.totalPage}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreateCurriculumModal isOpen={openCreateCTDT} onClose={() => setOpenCreateCTDT(false)} />
      <Nganh isOpen={showNganhModal} onClose={() => setShowNganhModal(false)} />
      <UpdateCTDT
        id={selectedCTDTId}
        isOpen={isModalOpenUpdateCTDT}
        onClose={() => setOpenModalUpdateCTDT(false)}
      />
      <XoaCTDT
        id={selectedCTDTId}
        isOpen={isModalOpenDeleteCTDT}
        onClose={() => setOpenModalDeleteCTDT(false)}
      />
      <CTKhung
        id={selectedCTDTId}
        isOpen={isModalOpenCTKhung}
        onClose={() => setOpenModalCTKhung(false)}
      />
    </div>
  );
}
