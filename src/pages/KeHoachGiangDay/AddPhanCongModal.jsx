"use client";

const AddPhanCongModal = ({
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
                <h2 className="text-xl font-bold mb-4">
                    Thêm phân công giảng dạy
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nhóm
                        </label>
                        <input
                            type="text"
                            name="newPhanCong.nhom"
                            value={currentItem?.newPhanCong?.nhom || ""}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Mã CBGD
                        </label>
                        <input
                            type="text"
                            name="newPhanCong.maCBGD"
                            value={currentItem?.newPhanCong?.maCBGD || ""}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Họ và tên CBGD
                        </label>
                        <input
                            type="text"
                            name="newPhanCong.tenCBGD"
                            value={currentItem?.newPhanCong?.tenCBGD || ""}
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số tiết thực hiện
                        </label>
                        <input
                            type="number"
                            name="newPhanCong.soTietThucHien"
                            value={
                                currentItem?.newPhanCong?.soTietThucHien || 0
                            }
                            onChange={onInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số tiết thực tế
                        </label>
                        <input
                            type="number"
                            name="newPhanCong.soTietThucTe"
                            value={currentItem?.newPhanCong?.soTietThucTe || 0}
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

export default AddPhanCongModal;
