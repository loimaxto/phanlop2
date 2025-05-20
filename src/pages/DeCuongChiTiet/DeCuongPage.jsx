import { useState, useEffect } from "react"
import HocPhanService from '@services/HocPhanService.js';
import CreateDeCuongModal from "./CreateDeCuongModal"
import EditDeCuongModal from "./EditDeCuongModal"
import DeCuongChiTietService from "../../services/DeCuongChiTietService";
import DetailDeCuongModal from "./DetailDeCuongModal"

export default function DeCuongPage() {
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [currentChooseDeCuong, setCurrentChoseDeCuong] = useState(null)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDetail, setIsOpenDetail] = useState(false)
    const [deCuongList, setDeCuongList] = useState([]);
    useEffect(() => {

        fetchHocPhan();
    }, [])
    if (deCuongList == null) return <>Lỗi lấy dữ liệu đề cương</>

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
        setCurrentChoseDeCuong(hocPhanObject)
        setIsOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setIsOpenEdit(false)
    }
    const handleCloseCreate = async () => {
        setIsOpenCreate(false);
        await fetchHocPhan();
    };
    const handleOpenDetail = (hocPhanObject) => {
        console.log("open")
        setCurrentChoseDeCuong(hocPhanObject)
        setIsOpenDetail(true)
    }

    const handleCloseDetail = () => {
        setIsOpenDetail(false)
        setCurrentChoseDeCuong(null)
    }
    const handleDeleteDeCuong = async (hocPhanId) => {
        const result = window.confirm('Bạn có chắc chắn xóa?');
        if (result) {
            try {
                console.log(hocPhanId);
                await DeCuongChiTietService.deleteDeCuong(hocPhanId); // Đợi xóa xong
                await fetchHocPhan(); // Sau đó mới load lại dữ liệu
            } catch (error) {
                console.error('Lỗi khi xóa đề cương:', error);
            }
        } else {
            console.log('Người dùng đã chọn Cancel');
        }
    };
    return (
        <div className="container h-full">

            <div className="flex items-center justify-between mb-4">
                <h1>Đề cương chi tiết</h1>
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsOpenCreate(true)} type="button" className="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="modal-create-de-cuong"> Tạo đề cương chi tiết </button>
                </div>
            </div>
            <div className="w-full overflow-x-auto ">
                <table className="table  ">

                    <thead className="text-center">
                        <tr className="">
                            <th className="border" rowSpan="2">Mã HP</th>
                            <th className="border" rowSpan="2">Tên Học phần</th>
                            <th className="border" rowSpan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="de-cuong-list">

                        {deCuongList.map((hocPhan, index) => (
                            <tr key={index} className="text-center ">
                                <td >{hocPhan.maHocPhan}</td>
                                <td>{hocPhan.tenHocPhan}</td>
                                <td>
                                    <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                        className="icon-[mdi--file-document-box-search-outline] size-5" onClick={() => handleOpenDetail(hocPhan)}></span></button>
                                    <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => handleOpenEdit(hocPhan)}><span
                                        className="icon-[tabler--pencil] size-5"></span></button>
                                    <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => { handleDeleteDeCuong(hocPhan.id) }} ><span
                                        className="icon-[tabler--trash] size-5"></span></button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
            <CreateDeCuongModal isOpen={isOpenCreate} onClose={handleCloseCreate} />
            <EditDeCuongModal isOpen={isOpenEdit} onClose={handleCloseEdit} hocPhanObject={currentChooseDeCuong} />
            <DetailDeCuongModal isOpen={isOpenDetail} onClose={handleCloseDetail} hocPhanObject={currentChooseDeCuong} />
        </div>
    )
}