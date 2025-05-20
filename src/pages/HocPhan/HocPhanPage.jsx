import { useEffect, useState } from "react"
import CreateHocPhanModal from "./CreateHocPhanModal"
import EditHocPhanModal from "./EditHocPhanModal"
import HocPhanService from '@services/HocPhanService.js';

export default function HocPhanPage() {

    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [currentHocPhanObject, setCurrentHocPhanObject] = useState(null);
    const [hocPhanList, setHocPhanList] = useState([]);
    const [searchMaHocPhan, setSearchMaHocPhan] = useState('');
    const [searchTenHocPhan, setSearchTenHocPhan] = useState('');

    useEffect(() => {

        fetchHocPhan();
    }, [isOpenCreate, isOpenEdit,])
    if (hocPhanList == null) return <>Lỗi lấy dữ liệu học phần</>

    const fetchHocPhan = async () => {
        try {
            const data = await HocPhanService.getAll();
            setHocPhanList(data);
            console.log('Dữ liệu học phần đã được tải:', data);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu học phần:', error);
        }
    };
    const filteredHocPhanList = hocPhanList.filter(hp =>
        hp.maHocPhan.toLowerCase().includes(searchMaHocPhan.toLowerCase()) &&
        hp.tenHocPhan.toLowerCase().includes(searchTenHocPhan.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsOpenCreate(true)
    }

    const handleCloseCreate = () => {
        setIsOpenCreate(false)
    }

    const handleCloseEdit = () => {
        setIsOpenEdit(false)
    }

    const handleChooseEdit = (hocphanObject) => {
        console.log(hocphanObject);
        setCurrentHocPhanObject(hocphanObject);
        setIsOpenEdit(true);
    }

    const handleDeleteHocPhan = async (hocPhanId) => {
        const result = window.confirm('Bạn có chắc chắn xóa?');
        if (result) {
            try {
                console.log(hocPhanId);
                await HocPhanService.deleteHocPhan(hocPhanId); // Đợi xóa xong
                await fetchHocPhan(); // Sau đó mới load lại dữ liệu
            } catch (error) {
                console.error('Lỗi khi xóa học phần:', error);
            }
        } else {
            console.log('Người dùng đã chọn Cancel');
        }
    };

    return (
        <div className="container h-full">
            <div className="flex items-center justify-between mb-4">
                <h1>Danh mục chương trình đào tạo</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleOpenCreate} type="button" className="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="modal-create-hoc-phan" data-overlay="#modal-create-hoc-phan" > Tạo học phần </button>
                </div>
            </div>

            <div className="w-full overflow-x-auto ">
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

                <table className="table  ">
                    <thead className="text-center">
                        <tr className="">
                            <th className="border" rowSpan="2">Mã HP</th>
                            <th className="border" rowSpan="2">Tên Học phần</th>
                            <th className="border" rowSpan="2">Số tín chỉ</th>
                            <th className="border" colSpan="4">Số tiết dạy học</th>
                            <th className="border" rowSpan="2">Hành động</th>
                        </tr>
                        <tr>
                            <th className="border">Lý thuyết</th>
                            <th className="border">Thực hành</th>
                            <th className="border">Bài tập</th>
                            <th className="border">Tổng</th>
                        </tr>
                    </thead>
                    <tbody id="ks-list">
                        {filteredHocPhanList.map((hocPhan, index) => (
                            <tr key={index} className="text-center ">
                                <td className="text-nowrap">{hocPhan.maHocPhan}</td>
                                <td>{hocPhan.tenHocPhan}</td>
                                <td>{hocPhan.soTinChi}</td>
                                <td className="">{hocPhan.soTietLyThuyet}</td>
                                <td className="">{hocPhan.soTietThucHanh}</td>
                                <td className="">{hocPhan.soTietBaiTap}</td>
                                <td className="">{hocPhan.soTietTongCong}</td>
                                <td>
                                    <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => handleChooseEdit(hocPhan)}><span
                                        className="icon-[tabler--pencil] size-5"></span></button>
                                    <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => handleDeleteHocPhan(hocPhan.id)}><span
                                        className="icon-[tabler--trash] size-5"></span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateHocPhanModal isOpen={isOpenCreate} onClose={handleCloseCreate} />
            <EditHocPhanModal isOpen={isOpenEdit} onClose={handleCloseEdit} hocPhanObject={currentHocPhanObject} />
        </div>

    )
}