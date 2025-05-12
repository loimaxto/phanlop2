export default function EditHocPhanModal({isOpen,onClose}) {
    if (!isOpen) return null;

    return (
        <div className="overlay modal opacity-100 duration-300" >
            <div className="modal-dialog opacity-100 duration-300">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Tạo học phần</h3>
                        <button onClick={onClose} type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3"  >
                            <span className="icon-[tabler--x] size-4"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the
                        modal, we use an inline style to set a minimum height, thereby extending the length of the overall modal and
                        demonstrating the overflow scrolling. When content becomes longer than the height of the viewport, scrolling
                        will move the modal as needed.
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