export default function CreateDeCuongModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="overlay bg-blend-screen modal opacity-100 duration-300" >
            <div className="modal-dialog opacity-100 duration-300 modal-dialog-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Tạo đề cương chi tiết</h3>
                        <button onClick={onClose} type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3"  >
                            <span className="icon-[tabler--x] size-4"></span>
                        </button>
                    </div>
                    <div className="modal-body ">
                        <div className="w-full">
                            <label className="label-text" for="input-ten-hp">Mã học phần</label>
                            <input type="text" placeholder="Jadsfasdf" className="input" id="input-ten-hp" />
                        </div>

                        <h3 className="mt-5">Nội dung</h3>
                        <div id="content-de-cuong" class="mb-8">
                            <div class="w-full grid grid-cols-[3fr_1fr_2fr_auto] gap-2 p-4 border border-gray-300">
                                <div class="font-bold text-center">Bộ phận đánh giá</div>
                                <div class="font-bold text-center">Trọng số</div>
                                <div class="font-bold text-center">Hình thức</div>
                                <div></div>
                            </div> 
                            <div class="content-item w-full grid grid-cols-[3fr_1fr_2fr_auto] gap-2 p-4 items-center">
                                <div><input type="text" class="input w-full" /></div>
                                <div><input type="number" min="0" class="input w-full" /></div>
                                <div><input type="text" class="input w-full" /></div>
                                <div class="w-fit"><button><span class="icon-[tabler--trash] size-5"></span></button></div>
                            </div>
                        </div>



                        <button className="btn btn-soft btn-gradient text-white">Thêm nội dung</button>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} type="button" className="btn btn-soft btn-secondary">Hủy</button>
                        <button type="button" className="btn btn-primary">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    )
}