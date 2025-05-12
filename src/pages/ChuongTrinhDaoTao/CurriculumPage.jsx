import { NavLink } from "react-router";
export default function CurriculumPage() {
    // const [isOpenCreate, setIsOpenCreate] = useState(false)
    // const handleCloseCreate = () => {
    //     setIsOpenCreate(false)
    // }

    return (
        <div className="container h-full">

            <div className="flex items-center justify-between mb-4">
                <h1>Danh mục chương trình đào tạo</h1>
                <div className="flex items-center gap-4">
                <NavLink
                        to="/create-ctdt"
                        className="btn btn-soft btn-gradient text-white"
                        aria-label="Action button"
                    >
                        Tạo mới chương trình đào tạo
                    </NavLink>
                </div>
            </div>
            <div className="w-full overflow-x-auto ">
                <table className="table  ">

                    <thead className="text-center">
                        <tr className="">
                            <th className="border" >Mã CTDT</th>
                            <th className="border" >Ngành</th>
                            <th className="border" >Hệ đào tạo</th>
                            <th className="border" >Trình độ</th>
                            <th className="border" >Năm ban hành</th>
                            <th className="border" >Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="de-cuong-list">

                        <tr className="text-center ">
                            <td >Mã CTDT</td>
                            <td >Ngành</td>
                            <td >Hệ đào tạo</td>
                            <td >Trình độ</td>
                            <td >Năm ban hành</td>
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
                            <td >Mã CTDT</td>
                            <td >Ngành</td>
                            <td >Hệ đào tạo</td>
                            <td >Trình độ</td>
                            <td >Năm ban hành</td>
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
            {/* <CreateDeCuongModal isOpen={isOpenCreate} onClose={handleCloseCreate} /> */}
        </div>
    )
}