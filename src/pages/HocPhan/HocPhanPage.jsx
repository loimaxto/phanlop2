import { useState } from "react"
import CreateHocPhanModal from "./CreateHocPhanModal"
import EditHocPhanModal from "./EditHocPhanModal"
export default function HocPhanPage() {
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenCreate = () => {
        setIsOpenCreate(true)
    }
    const handleCloseCreate = () => {
        setIsOpenCreate(false)
    }
    // const handleOpenEdit = () => {
    //     setIsOpenEdit(true)
    // }
    const handleCloseEdit = () => {
        setIsOpenEdit(false)
    }

    return (
        <div className="container h-full">
            <div className="flex items-center justify-between mb-4">
                <h1>Danh mục chương trình đào tạo</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleOpenCreate} type="button" className="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="modal-create-hoc-phan" data-overlay="#modal-create-hoc-phan" > Tạo học phần </button>
                </div>
            </div>

            <div className="w-full overflow-x-auto ">
                <table className="table  ">
                    <thead className="text-center">
                        <tr className="">
                            <th className="border" rowSpan="2">Mã HP</th>
                            <th className="border" rowSpan="2">Tên Học phần</th>
                            <th className="border" rowSpan="2">Số tín chỉ</th>
                            <th className="border" colSpan="3">Số tiết dạy học</th>
                            <th className="border" rowSpan="2">Hệ số học phần</th>
                            <th className="border" rowSpan="2">Hành động</th>
                        </tr>
                        <tr>
                            <th className="border">Lý thuyết</th>
                            <th className="border">Thực hành</th>
                            <th className="border">Cộng</th>
                        </tr>
                    </thead>
                    <tbody id="ks-list">
                        <tr className="text-center ">
                            <td className="text-nowrap">123</td>
                            <td>janesmith@example.com</td>
                            <td>1</td>
                            <td className="">1</td>
                            <td className="">1</td>
                            <td className="">1</td>
                            <td className="">1</td>
                            <td>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--pencil] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--trash] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--dots-vertical] size-5"></span></button>
                            </td>
                        </tr>
                        <tr className="text-center ">
                            <td className="text-nowrap">123</td>
                            <td>janesmith@example.com</td>
                            <td>1</td>
                            <td className="">1</td>
                            <td className="">1</td>
                            <td className="">1</td>
                            <td className="">1</td>
                            <td>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--pencil] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--trash] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--dots-vertical] size-5"></span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <CreateHocPhanModal isOpen={isOpenCreate} onClose={handleCloseCreate} />
            <EditHocPhanModal isOpen={isOpenEdit} onClose={handleCloseEdit} />
        </div>

    )
}