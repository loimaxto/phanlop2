import { useState } from "react"
import CreateDeCuongModal from "./CreateDeCuongModal"
export default function DeCuongPage() {
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const handleCloseCreate = () => {
        setIsOpenCreate(false)
    }

    return (
        <div className="container h-full">
            
            <div className="flex items-center justify-between mb-4">
            <h1>Đề cương chi tiết</h1>
                <div className="flex items-center gap-4">
                    <button onClick={()=>setIsOpenCreate(true)} type="button" className="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="modal-create-de-cuong"> Tạo đề cương chi tiết </button>
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

                        <tr className="text-center ">
                            <td >123</td>
                            <td>janesmith@example.com</td>

                            <td>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[mdi--file-document-box-search-outline] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--pencil] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--trash] size-5"></span></button>
                            </td>
                        </tr>
                        <tr className="text-center ">
                            <td >123</td>
                            <td>janesmith@example.com</td>

                            <td>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[mdi--file-document-box-search-outline] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--pencil] size-5"></span></button>
                                <button className="btn btn-circle btn-text btn-sm" aria-label="Action button"><span
                                    className="icon-[tabler--trash] size-5"></span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <CreateDeCuongModal isOpen={isOpenCreate} onClose={handleCloseCreate} />
        </div>
    )
}