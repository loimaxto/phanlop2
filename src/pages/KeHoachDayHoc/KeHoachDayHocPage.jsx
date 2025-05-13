// 'use client';

// import React from 'react';
// import { useState, useEffect } from 'react';
// import printService from '../../services/print-service';
// import { nhomKienThucData, keHoachDayHocData, nganhData } from '../../dumpData';
// import AddKeHoachDayHocModal from './AddKeHoachDayHocModal';
// import EditKeHoachDayHocModal from './EditKeHoachDayHocModal';
// import dataService from '../../services/keHoachDayHoc-service';
// import { useParams } from 'react-router';

// const KeHoachDayHocPage = () => {
//   const { nganhId } = useParams();
//   const [nganh, setNganh] = useState({
//     name: '',
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [modalMode, setModalMode] = useState('add'); // add, edit
//   const [selectedGroup, setSelectedGroup] = useState('all');
//   const [expandedGroups, setExpandedGroups] = useState({});
//   const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
//   const [needRefresh, setNeedRefresh] = useState(true);
//   // Khởi tạo dữ liệu kế hoạch dạy học
//   const [keHoachData, setKeHoachData] = useState([]);

//   const colors = 'blue, red, green'.split(',').map(color => `bg-${color.trim()}-50`);

//   useEffect(() => {
//     // Lấy thông tin ngành từ dumpData
//     (async () => {
//       const nganh = await dataService.getNganhById(nganhId);
//       setNganh(nganh);
//     })();
//   }, [nganhId]);

//   // Lấy dữ liệu từ dumpData khi cần refresh
//   useEffect(() => {
//     if (needRefresh) {
//       setKeHoachData(keHoachDayHocData);
//       setNeedRefresh(false);
//     }
//   }, [needRefresh]);

//   useEffect(() => {
//     console.log('Ke Hoach Data:', keHoachData);
//   }, [keHoachData]);

//   // Khởi tạo trạng thái mở rộng cho tất cả các nhóm
//   useEffect(() => {
//     const initialExpandedState = {};
//     nhomKienThucData.forEach(group => {
//       initialExpandedState[group.id] = true;
//     });
//     setExpandedGroups(initialExpandedState);
//   }, []);

//   // Hàm lấy màu nền cho nhóm
//   const getGroupColor = num => {
//     return colors[num % colors.length];
//   };

//   // Lọc dữ liệu theo từ khóa tìm kiếm và nhóm môn học
//   const filteredData = keHoachData.filter(item => {
//     const matchesSearch =
//       item.maHP.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.tenHocPhan.toLowerCase().includes(searchTerm.toLowerCase());

//     if (selectedGroup === 'all') {
//       return matchesSearch;
//     } else {
//       return matchesSearch && item.nhomKienThucId == selectedGroup;
//     }
//   });

//   // Nhóm dữ liệu theo nhóm môn học
//   const groupedData = {};
//   nhomKienThucData.forEach(group => {
//     groupedData[group.id] = filteredData.filter(item => item.nhomKienThucId == group.id);
//   });
//   console.log('Grouped Data:', groupedData);

//   // Tính tổng số tín chỉ cho mỗi nhóm
//   const groupCredits = {};
//   nhomKienThucData.forEach(group => {
//     groupCredits[group.id] = groupedData[group.id].reduce((sum, item) => sum + item.soTinChi, 0);
//   });

//   // Xử lý thêm mới
//   const handleAdd = () => {
//     setModalMode('add');
//     setIsModalOpen(true);
//   };

//   // Xử lý chỉnh sửa
//   const handleEdit = item => {
//     setModalMode('edit');
//     setCurrentItem({ ...item });
//     setIsModalOpen(true);
//   };

//   // Xử lý xóa
//   const handleDelete = id => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa học phần này?')) {
//       // Xóa học phần khỏi danh sách
//       const updatedData = keHoachData.filter(item => item.id !== id);
//       setKeHoachData(updatedData);
//     }
//   };

//   // Xử lý lưu khi thêm mới
//   const handleSaveAdd = item => {
//     // Tạo ID mới
//     const newId = keHoachData.length > 0 ? Math.max(...keHoachData.map(item => item.id)) + 1 : 1;

//     // Tạo học phần mới
//     const newItem = {
//       ...item,
//       id: newId,
//       tt: newId,
//       nhomKienThucId: item.nhomKienThucId,
//     };

//     // Thêm vào danh sách
//     setKeHoachData([...keHoachData, newItem]);
//     setIsModalOpen(false);
//   };

//   // Xử lý lưu khi chỉnh sửa
//   const handleSaveEdit = updatedItem => {
//     // Cập nhật học phần vao dumpData: LOI
//     keHoachDayHocData.splice(
//       keHoachData.findIndex(item => item.id == updatedItem.id),
//       1,
//       updatedItem
//     );
//     // const updatedData = keHoachData.map(item => (item.id == updatedItem.id ? updatedItem : item));

//     setNeedRefresh(true);
//     setIsModalOpen(false);
//   };

//   // Xử lý mở rộng/thu gọn nhóm
//   const toggleGroup = groupId => {
//     setExpandedGroups({
//       ...expandedGroups,
//       [groupId]: !expandedGroups[groupId],
//     });
//   };

//   // Xử lý in kế hoạch dạy học
//   const handlePrint = () => {
//     printService.printKeHoachDayHoc(nganh.name, keHoachData, nhomKienThucData);
//     setIsPrintMenuOpen(false);
//   };

//   // Xử lý in kế hoạch dạy học theo nhóm
//   const handlePrintByGroup = group => {
//     printService.printKeHoachDayHocByGroup(keHoachData, group, searchTerm);
//     setIsPrintMenuOpen(false);
//   };

//   // Xử lý in phân bố tín chỉ
//   const handlePrintDistribution = () => {
//     printService.printCreditDistribution(keHoachData, nhomKienThucData);
//     setIsPrintMenuOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex flex-col">
//             <h1 className="text-2xl font-bold">Kế hoạch dạy học</h1>
//             <h3>Ngành: {nganh?.name || 'Demo'}</h3>
//           </div>
//           <div className="flex space-x-2">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm học phần..."
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <svg
//                 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="relative">
//               <button
//                 onClick={() => setIsPrintMenuOpen(!isPrintMenuOpen)}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-1"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 In
//               </button>
//               {isPrintMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//                   <div className="py-1" role="menu" aria-orientation="vertical">
//                     <button
//                       onClick={handlePrint}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       role="menuitem"
//                     >
//                       In tất cả
//                     </button>
//                     {/* <button
//                       onClick={handlePrintDistribution}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       role="menuitem"
//                     >
//                       In phân bố tín chỉ
//                     </button> */}
//                     {/* <div className="border-t border-gray-100 my-1"></div>
//                     {nhomKienThucData.map(group => (
//                       <button
//                         key={group.id}
//                         onClick={() => handlePrintByGroup(group)}
//                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         In nhóm {group.name.split('.')[0]}
//                       </button>
//                     ))} */}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={handleAdd}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-1"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Thêm
//             </button>
//           </div>
//         </div>

//         <div className="mb-4 flex flex-wrap gap-2">
//           <div className="flex items-center space-x-2">
//             <span className="text-sm font-medium">Lọc theo nhóm:</span>
//             <select
//               value={selectedGroup}
//               onChange={e => setSelectedGroup(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">Tất cả nhóm</option>
//               {nhomKienThucData.map(group => (
//                 <option key={group.id} value={group.id}>
//                   {group.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-3 border">TT</th>
//                 <th className="p-3 border">Mã HP</th>
//                 <th className="p-3 border">Tên Học phần</th>
//                 <th className="p-3 border">Số tín chỉ</th>
//                 <th className="p-3 border text-center" colSpan="12">
//                   Học kỳ thực hiện
//                 </th>
//                 <th className="p-3 border">Mã học phần trước</th>
//                 <th className="p-3 border">Thao tác</th>
//               </tr>
//               <tr className="bg-gray-100">
//                 <th className="p-3 border" colSpan="4"></th>
//                 {[...Array(12)].map((_, i) => (
//                   <th key={i} className="p-2 border w-8 text-center">
//                     {i + 1}
//                   </th>
//                 ))}
//                 <th className="p-3 border" colSpan="2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {nhomKienThucData.map((group, groupIndex) => {
//                 const groupItems = groupedData[group.id] || [];
//                 if (groupItems.length === 0 && selectedGroup !== 'all') return null;

//                 return (
//                   <React.Fragment key={group.id}>
//                     {/* Tiêu đề nhóm */}
//                     <tr className={`${getGroupColor(groupIndex)} border`}>
//                       <td
//                         colSpan="17"
//                         className="p-3 font-medium cursor-pointer"
//                         onClick={() => toggleGroup(group.id)}
//                       >
//                         <div className="flex justify-between items-center">
//                           <div>
//                             {group.name} ({groupItems.length} học phần - {groupCredits[group.id]}{' '}
//                             tín chỉ)
//                           </div>
//                           <div>
//                             {expandedGroups[group.id] ? (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             ) : (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                     </tr>

//                     {/* Các học phần trong nhóm */}
//                     {expandedGroups[group.id] &&
//                       groupItems.map((item, index) => (
//                         <tr key={item.id} className="hover:bg-gray-50">
//                           <td className="p-3 border">{index + 1}</td>
//                           <td className="p-3 border">{item.maHP}</td>
//                           <td className="p-3 border">{item.tenHocPhan}</td>
//                           <td className="p-3 border text-center">{item.soTinChi}</td>
//                           {[...Array(12)].map((_, i) => (
//                             <td key={i} className="p-2 border text-center">
//                               {item.hocKy.includes(i + 1) ? (
//                                 <span className="inline-block w-4 h-4 bg-blue-500 rounded-sm text-white text-xs flex items-center justify-center">
//                                   x
//                                 </span>
//                               ) : null}
//                             </td>
//                           ))}
//                           <td className="p-3 border">{item.maHocPhanTruoc}</td>
//                           <td className="p-3 border">
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => handleEdit(item)}
//                                 className="text-blue-500 hover:text-blue-700"
//                               >
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   className="h-5 w-5"
//                                   viewBox="0 0 20 20"
//                                   fill="currentColor"
//                                 >
//                                   <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                                 </svg>
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(item.id)}
//                                 className="text-red-500 hover:text-red-700"
//                               >
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   className="h-5 w-5"
//                                   viewBox="0 0 20 20"
//                                   fill="currentColor"
//                                 >
//                                   <path
//                                     fillRule="evenodd"
//                                     d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                                     clipRule="evenodd"
//                                   />
//                                 </svg>
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}

//                     {/* Hiển thị thông báo nếu không có học phần nào trong nhóm */}
//                     {expandedGroups[group.id] && groupItems.length === 0 && (
//                       <tr>
//                         <td colSpan="17" className="p-3 border text-center text-gray-500">
//                           Không có học phần nào trong nhóm này
//                         </td>
//                       </tr>
//                     )}

//                     {/* Dòng tổng kết cho nhóm */}
//                     {expandedGroups[group.id] && groupItems.length > 0 && (
//                       <tr className={`${getGroupColor(groupIndex)} border-t-2 border-gray-300`}>
//                         <td colSpan="3" className="p-2 border text-right font-medium">
//                           Tổng số tín chỉ nhóm {group.name.split('.')[0]}:
//                         </td>
//                         <td className="p-2 border text-center font-medium">
//                           {groupCredits[group.id]}
//                         </td>
//                         <td colSpan="13" className="p-2 border"></td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 );
//               })}

//               {/* Hiển thị thông báo nếu không có kết quả tìm kiếm */}
//               {filteredData.length === 0 && (
//                 <tr>
//                   <td colSpan="17" className="p-3 border text-center text-gray-500">
//                     Không tìm thấy học phần nào
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//             <tfoot>
//               <tr className="bg-gray-100 font-medium">
//                 <td colSpan="3" className="p-3 border text-right">
//                   Tổng số tín chỉ:
//                 </td>
//                 <td className="p-3 border text-center">
//                   {filteredData.reduce((sum, item) => sum + item.soTinChi, 0)}
//                 </td>
//                 <td colSpan="13" className="p-3 border"></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>

//       {/* Modal thêm học phần */}
//       <AddKeHoachDayHocModal
//         isOpen={isModalOpen && modalMode === 'add'}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSaveAdd}
//       />

//       {/* Modal chỉnh sửa học phần */}
//       <EditKeHoachDayHocModal
//         isOpen={isModalOpen && modalMode === 'edit'}
//         onClose={() => setIsModalOpen(false)}
//         currentItem={currentItem}
//         onSave={handleSaveEdit}
//       />
//     </div>
//   );
// };

// export default KeHoachDayHocPage;
