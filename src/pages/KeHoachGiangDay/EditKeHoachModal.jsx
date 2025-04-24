"use client";

const EditKeHoachModal = ({
    isOpen,
    onClose,
    currentItem,
    onInputChange,
    onSave,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa kế hoạch</h2>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Mã học phần
                        </label>
                        <input
                            type="text"
                            name="maHP"
                            value={currentItem?.maHP || ""}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Tên học phần
                        </label>
                        <input
                            type="text"
                            name="tenHocPhan"
                            value={currentItem?.tenHocPhan || ""}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số tín chỉ
                        </label>
                        <input
                            type="number"
                            name="soTC"
                            value={currentItem?.soTC || 0}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Khoa
                        </label>
                        <input
                            type="text"
                            name="khoa"
                            value={currentItem?.khoa || ""}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số tiết LT
                        </label>
                        <input
                            type="number"
                            name="soTiet.LT"
                            value={currentItem?.soTiet?.LT || 0}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số tiết BT
                        </label>
                        <input
                            type="number"
                            name="soTiet.BT"
                            value={currentItem?.soTiet?.BT || 0}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số tiết TH
                        </label>
                        <input
                            type="number"
                            name="soTiet.TH"
                            value={currentItem?.soTiet?.TH || 0}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số tiết TC
                        </label>
                        <input
                            type="number"
                            name="soTiet.TC"
                            value={currentItem?.soTiet?.TC || 0}
                            readOnly
                            className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Hệ số HP
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="heSoHP"
                            value={currentItem?.heSoHP || 0}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tổng số nhóm
                        </label>
                        <input
                            type="number"
                            name="tongSoNhom"
                            value={currentItem?.tongSoNhom || 0}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            SLSV/Nhóm
                        </label>
                        <input
                            type="number"
                            name="slsvNhom"
                            value={currentItem?.slsvNhom || 0}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditKeHoachModal;
