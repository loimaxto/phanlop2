// 'use client';

// import { useState, useEffect } from 'react';
// import { nhomKienThucData } from '../../dumpData';

// const EditKeHoachDayHocModal = ({ isOpen, onClose, currentItem: initialItem, onSave }) => {
//   const [currentItem, setCurrentItem] = useState(initialItem || {});

//   // Cập nhật currentItem khi initialItem thay đổi
//   useEffect(() => {
//     if (initialItem) {
//       setCurrentItem(initialItem);
//     }
//   }, [initialItem]);

//   // Xử lý thay đổi trường dữ liệu
//   const handleInputChange = e => {
//     const { name, value } = e.target;

//     setCurrentItem({
//       ...currentItem,
//       [name]: value,
//     });
//   };

//   // Xử lý thay đổi học kỳ (checkbox)
//   const handleHocKyChange = hocKy => {
//     const hocKyArray = [...currentItem.hocKy];

//     if (hocKyArray.includes(hocKy)) {
//       // Nếu đã có, loại bỏ
//       const index = hocKyArray.indexOf(hocKy);
//       hocKyArray.splice(index, 1);
//     } else {
//       // Nếu chưa có, thêm vào
//       hocKyArray.push(hocKy);
//     }

//     setCurrentItem({
//       ...currentItem,
//       hocKy: hocKyArray.sort((a, b) => a - b),
//     });
//   };

//   // Xử lý thay đổi nhóm môn học trong form
//   const handleGroupChange = e => {
//     setCurrentItem({
//       ...currentItem,
//       nhomKienThucId: e.target.value,
//     });
//   };

//   if (!isOpen || !initialItem) return null;

//   return (
//     <div className="fixed inset-0 bg-[#00000094] flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//         <h2 className="text-xl font-bold mb-4">Chỉnh sửa học phần</h2>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Mã học phần</label>
//             <input
//               type="text"
//               name="maHP"
//               value={currentItem?.maHP || ''}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Số tín chỉ</label>
//             <input
//               type="number"
//               name="soTinChi"
//               value={currentItem?.soTinChi || 0}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="col-span-2">
//             <label className="block text-sm font-medium mb-1">Tên học phần</label>
//             <input
//               type="text"
//               name="tenHocPhan"
//               value={currentItem?.tenHocPhan || ''}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Mã học phần trước</label>
//             <input
//               type="text"
//               name="maHocPhanTruoc"
//               value={currentItem?.maHocPhanTruoc || ''}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Nhóm môn học</label>
//             <select
//               name="nhomKienThucId"
//               value={currentItem?.nhomKienThucId || ''}
//               onChange={handleGroupChange}
//               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {nhomKienThucData.map(group => (
//                 <option key={group.id} value={group.id}>
//                   {group.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Học kỳ thực hiện</label>
//           <div className="grid grid-cols-6 gap-2">
//             {[...Array(12)].map((_, i) => (
//               <div key={i} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={`edit-hocky-${i + 1}`}
//                   checked={currentItem?.hocKy?.includes(i + 1) || false}
//                   onChange={() => handleHocKyChange(i + 1)}
//                   className="mr-2"
//                 />
//                 <label htmlFor={`edit-hocky-${i + 1}`}>Học kỳ {i + 1}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
//           >
//             Hủy
//           </button>
//           <button
//             onClick={() => onSave(currentItem)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Lưu
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditKeHoachDayHocModal;
