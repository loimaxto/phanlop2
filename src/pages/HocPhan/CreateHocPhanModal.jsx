export default function CreateHocPhanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay bg-blend-screen modal opacity-100 duration-300">
      <div className="modal-dialog opacity-100 duration-300">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Tạo học phần</h3>
            <button
              onClick={onClose}
              type="button"
              className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            >
              <span className="icon-[tabler--x] size-4"></span>
            </button>
          </div>
          <div className="modal-body items-center">
            <div className="w-full">
              <label className="label-text" for="input-ten-hp">
                Tên học phần
              </label>
              <input type="text" placeholder="John Doe" className="input" id="input-ten-hp" />
            </div>
            <div className="flex flex-row gap-4">
              <div className="max-w-32">
                <label className="label-text" for="so-tinh-chi">
                  Số tính chỉ:
                </label>
                <div className="input items-center">
                  <input className="text-center" type="number" min="0" id="so-tinh-chi" />
                </div>
              </div>
              <div className="max-w-32">
                <label className="label-text" for="tiet-practical">
                  Hệ số học phần:
                </label>
                <div className="input items-center">
                  <input className="text-center" type="number" min="0" id="tiet-practical" />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="max-w-32">
                <label className="label-text" for="tiet-theory">
                  Số tiết lý thuyết:
                </label>
                <div className="input items-center">
                  <input className="text-center" type="number" min="0" id="tiet-theory" />
                </div>
              </div>
              <div className="max-w-32">
                <label className="label-text" for="tiet-practical">
                  Số tiết thực hành:
                </label>
                <div className="input items-center">
                  <input className="text-center" type="number" min="0" id="tiet-practical" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="label-text" for="select-nhom-kien-thuc">
                {' '}
                Nhóm kiến thức
              </label>
              <select className="select" id="select-nhom-kien-thuc">
                <option>The Godfather</option>
              </select>
            </div>
            <div className="w-full">
              <label className="label-text" for="select-nhom-kien-thuc">
                Loại học phần
              </label>
              <select className="select" id="select-nhom-kien-thuc">
                <option value="1">Bắt buộc</option>
                <option value="2">Tùy chọn</option>
              </select>
            </div>
            <div className="w-full">
              <label className="label-text" for="input-hp-tien-quyet">
                Học phần tiên quyết
              </label>
              <input type="text" placeholder="fadsf" className="input" id="input-hp-tien-quyet" />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} type="button" className="btn btn-soft btn-secondary">
              Hủy
            </button>
            <button type="button" className="btn btn-primary">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
