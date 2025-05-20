import { useState, useEffect } from "react";
import HocPhanService from '@services/HocPhanService.js';
import CreateDeCuongModal from "./CreateDeCuongModal";
import EditDeCuongModal from "./EditDeCuongModal";
import DeCuongChiTietService from "../../services/DeCuongChiTietService";
import DetailDeCuongModal from "./DetailDeCuongModal";

export default function DeCuongPage() {
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [currentChooseDeCuong, setCurrentChoseDeCuong] = useState(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [deCuongList, setDeCuongList] = useState([]);

    const [searchMaHocPhan, setSearchMaHocPhan] = useState("");
    const [searchTenHocPhan, setSearchTenHocPhan] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchHocPhan();
    }, []);

    useEffect(() => {
        setCurrentPage(1); // Reset về trang đầu khi thay đổi bộ lọc
    }, [searchMaHocPhan, searchTenHocPhan]);

    const fetchHocPhan = async () => {
        try {
            const data = await HocPhanService.getHocPhanWithDeCuongChitiet();
            setDeCuongList(data);
            console.log('Dữ liệu đề cương đã được tải:', data);
        } catch (error) {
            console.error('Lỗi khi tải dữ đề cương:', error);
        }
    };

    const handleOpenEdit = (hocPhanObject) => {
        setCurrentChoseDeCuong(hocPhanObject);
        setIsOpenEdit(true);
    };

    const handleCloseEdit = () => setIsOpenEdit(false);

    const handleCloseCreate = async () => {
        setIsOpenCreate(false);
        await fetchHocPhan();
    };

    const handleOpenDetail = (hocPhanObject) => {
        setCurrentChoseDeCuong(hocPhanObject);
        setIsOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setIsOpenDetail(false);
        setCurrentChoseDeCuong(null);
    };

    const handleDeleteDeCuong = async (hocPhanId) => {
        const result = window.confirm('Bạn có chắc chắn xóa?');
        if (result) {
            try {
                await DeCuongChiTietService.deleteDeCuong(hocPhanId);
                await fetchHocPhan();
            } catch (error) {
                console.error('Lỗi khi xóa đề cương:', error);
            }
        }
    };

    const filteredList = deCuongList.filter(hp =>
        hp.maHocPhan.toLowerCase().includes(searchMaHocPhan.toLowerCase()) &&
        hp.tenHocPhan.toLowerCase().includes(searchTenHocPhan.toLowerCase())
    );

    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    const paginatedList = filteredList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (deCuongList == null) return <>Lỗi lấy dữ liệu đề cương</>;

    return (
        <div className="container h-full">
            <div className="flex items-center justify-between mb-4">
                <h1>Đề cương chi tiết</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpenCreate(true)}
                        type="button"
                        className="btn btn-primary"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="modal-create-de-cuong"
                    >
                        Tạo đề cương chi tiết
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    className="input w-60"
                    placeholder="Tìm theo mã học phần"
                    value={searchMaHocPhan}
                    onChange={(e) => setSearchMaHocPhan(e.target.value)}
                />
                <input
                    type="text"
                    className="input w-60"
                    placeholder="Tìm theo tên học phần"
                    value={searchTenHocPhan}
                    onChange={(e) => setSearchTenHocPhan(e.target.value)}
                />
            </div>

            <div className="w-full overflow-x-auto h-[400px]">
                <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th className="border" rowSpan="2">Mã HP</th>
                            <th className="border" rowSpan="2">Tên Học phần</th>
                            <th className="border" rowSpan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="de-cuong-list">
                        {paginatedList.map((hocPhan, index) => (
                            <tr key={index} className="text-center">
                                <td>{hocPhan.maHocPhan}</td>
                                <td>{hocPhan.tenHocPhan}</td>
                                <td>
                                    <button className="btn btn-circle btn-text btn-sm" onClick={() => handleOpenDetail(hocPhan)}>
                                        <span className="icon-[mdi--file-document-box-search-outline] size-5"></span>
                                    </button>
                                    <button className="btn btn-circle btn-text btn-sm" onClick={() => handleOpenEdit(hocPhan)}>
                                        <span className="icon-[tabler--pencil] size-5"></span>
                                    </button>
                                    <button className="btn btn-circle btn-text btn-sm" onClick={() => handleDeleteDeCuong(hocPhan.id)}>
                                        <span className="icon-[tabler--trash] size-5"></span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredList.length > 0 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        className="btn btn-sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        &laquo; Trước
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
                        Sau &raquo;
                    </button>
                </div>
            )}

            <CreateDeCuongModal isOpen={isOpenCreate} onClose={handleCloseCreate} />
            <EditDeCuongModal isOpen={isOpenEdit} onClose={handleCloseEdit} hocPhanObject={currentChooseDeCuong} />
            <DetailDeCuongModal isOpen={isOpenDetail} onClose={handleCloseDetail} hocPhanObject={currentChooseDeCuong} />
        </div>
    );
}
