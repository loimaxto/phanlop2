import { useState } from 'react';
import { phanCongGiangDayData, keHoachGiangDayData } from '../../dumpData';

const AddPhanCongModal = ({ isOpen, onClose, keHoach, refresh }) => {
  if (!isOpen || !keHoach) return null;

  const [phanCong, setPhanCong] = useState({
    id: phanCongGiangDayData.length + 1,
    nhom: 0,
    keHoachMoNhomId: keHoach.id,
    maCBGD: '',
    tenCBGD: '',
    soTietThucHien: 0,
    soTietThucTe: 0,
  });

  const onSave = () => {
    // Validate form data here
    if (!phanCong.maCBGD || !phanCong.tenCBGD) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Fake Xu ly o banckend
    let keHoachData = keHoachGiangDayData.find(item => item.id == keHoach.id);
    if (keHoachData) {
      phanCongGiangDayData.push(phanCong);
      keHoachData.phanCong.push(phanCong);
    }

    // Close modal and refresh data
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Thêm phân công giảng dạy</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nhóm</label>
            <input
              type="text"
              name="nhom"
              value={phanCong.nhom || ''}
              onChange={e =>
                setPhanCong({
                  ...phanCong,
                  nhom: parseInt(e.target.value),
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mã CBGD</label>
            <input
              type="text"
              name="maCBGD"
              value={phanCong.maCBGD || ''}
              onChange={e =>
                setPhanCong({
                  ...phanCong,
                  maCBGD: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên CBGD</label>
            <input
              type="text"
              name="tenCBGD"
              value={phanCong.tenCBGD || ''}
              onChange={e =>
                setPhanCong({
                  ...phanCong,
                  tenCBGD: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết thực hiện</label>
            <input
              type="number"
              name="soTietThucHien"
              value={phanCong.soTietThucHien || 0}
              onChange={e =>
                setPhanCong({
                  ...phanCong,
                  soTietThucHien: parseInt(e.target.value),
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiết thực tế</label>
            <input
              type="number"
              name="soTietThucTe"
              value={phanCong.soTietThucTe || 0}
              onChange={e =>
                setPhanCong({
                  ...phanCong,
                  soTietThucTe: parseInt(e.target.value),
                })
              }
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
            onClick={() => onSave(phanCong)}
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
