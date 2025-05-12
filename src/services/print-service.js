import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import '../assets/fonts/times-normal.js';
import '../assets/fonts/times-bold.js';

jsPDF.API.autoTable = autoTable;

// Hàm tạo header cho PDF
const createHeader = (
  doc,
  title,
  tenNganh = 'Công nghệ thông tin',
  schoolName = 'TRƯỜNG ĐẠI HỌC XYZ',
  departmentName = 'KHOA ABC'
) => {
  const pageWidth = doc.internal.pageSize.width;

  // Thông tin trường và khoa (bên trái)
  doc.setFontSize(11);
  doc.setFont('times', 'bold');
  doc.text(schoolName, 20, 20);
  doc.setFont('times', 'normal');
  doc.text(departmentName, 20, 25);

  // Thông tin về tài liệu (bên phải)
  doc.setFont('times', 'bold');
  doc.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', pageWidth - 20, 20, {
    align: 'right',
  });
  doc.setFont('times', 'normal');
  doc.text('Độc lập - Tự do - Hạnh phúc', pageWidth - 20, 25, {
    align: 'right',
  });

  // Đường kẻ ngăn cách
  doc.setLineWidth(0.5);
  doc.line(20, 30, pageWidth - 20, 30);

  // Tiêu đề tài liệu
  doc.setFontSize(16);
  doc.setFont('times', 'bold');
  doc.text(title, pageWidth / 2, 45, { align: 'center' });

  //Tên ngành
  doc.setFontSize(14);
  doc.setFont('times', 'bold');
  doc.text('Ngành: ' + tenNganh, pageWidth / 2, 52, { align: 'center' });

  // Thông tin thời gian
  const currentDate = format(new Date(), "dd 'tháng' MM 'năm' yyyy", {
    locale: vi,
  });
  doc.setFontSize(11);
  doc.setFont('times', 'normal');
  doc.text(`Ngày in: ${currentDate}`, pageWidth / 2, 58, { align: 'center' });

  // Trả về vị trí Y để bắt đầu vẽ bảng
  return 65;
};

// Hàm tạo footer cho PDF
const createFooter = doc => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(10);
  doc.setFont('times', 'normal');
  doc.text(`Trang ${doc.internal.getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, {
    align: 'center',
  });
};

// Hàm chính để in kế hoạch dạy học
export const printKeHoachDayHoc = (
  tenNganh = 'Công nghệ thông tin',
  keHoachData,
  nhomKienThucData,
  selectedGroup = 'all',
  searchTerm = ''
) => {
  // Khởi tạo PDF với khổ giấy A4 nằm ngang
  const doc = new jsPDF('landscape', 'mm', 'a4');

  // Tạo header
  const startY = createHeader(doc, 'KẾ HOẠCH DẠY HỌC', tenNganh);

  // Lọc dữ liệu theo điều kiện tìm kiếm và nhóm
  const filteredData = keHoachData.filter(item => {
    console.log('item', item);
    const matchesSearch =
      item.maHP.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenHocPhan.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedGroup === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && item.nhomKienThucId == selectedGroup;
    }
  });

  // Nhóm dữ liệu theo nhóm môn học
  const groupedData = {};
  nhomKienThucData.forEach(group => {
    groupedData[group.id] = filteredData.filter(item => item.nhomKienThucId == group.id);
  });

  // Chuẩn bị dữ liệu cho bảng
  const tableData = [];
  let currentIndex = 1; // Biến đếm cho số thứ tự

  // Thêm dữ liệu từng nhóm vào bảng
  nhomKienThucData.forEach(group => {
    const groupItems = groupedData[group.id] || [];
    if (groupItems.length === 0 && selectedGroup !== 'all') return;

    // Tính tổng số tín chỉ của nhóm
    const totalCredits = groupItems.reduce((sum, course) => sum + course.soTinChi, 0);

    // Thêm dòng tiêu đề nhóm vào bảng
    tableData.push([
      {
        content: `${group.name}`,
        colSpan: 3,
        styles: {
          fontStyle: 'bold',
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
        },
      },
      {
        content: `${totalCredits}`,
        styles: {
          fontStyle: 'bold',
          fillColor: [240, 240, 240],
          halign: 'center',
          textColor: [0, 0, 0],
        },
      },
      { content: '', colSpan: 13, styles: { fillColor: [240, 240, 240] } },
    ]);

    // Thêm dữ liệu các học phần trong nhóm
    groupItems.forEach(course => {
      // Tạo mảng học kỳ
      const semesters = Array(12).fill('');
      course.hocKy.forEach(semester => {
        semesters[semester - 1] = 'x';
      });

      tableData.push([
        currentIndex++,
        course.maHP,
        course.tenHocPhan,
        course.soTinChi,
        ...semesters,
        course.maHocPhanTruoc || '',
      ]);
    });
  });

  // Tính tổng số tín chỉ toàn chương trình
  const totalCredits = filteredData.reduce((sum, item) => sum + item.soTinChi, 0);

  // Thêm dòng tổng kết cuối cùng
  tableData.push([
    {
      content: 'TỔNG CỘNG',
      colSpan: 3,
      styles: {
        fontStyle: 'bold',
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
      },
    },
    {
      content: `${totalCredits}`,
      styles: {
        fontStyle: 'bold',
        fillColor: [220, 220, 220],
        halign: 'center',
        textColor: [0, 0, 0],
      },
    },
    ...Array(13).fill({
      content: '',
      styles: { fillColor: [220, 220, 220] },
    }),
  ]);

  // Cấu hình cột cho bảng
  const tableColumns = [
    { header: 'TT', dataKey: 'tt' },
    { header: 'Mã HP', dataKey: 'maHP' },
    { header: 'Tên học phần', dataKey: 'tenHP' },
    { header: 'Số TC', dataKey: 'soTC' },
    ...Array(12)
      .fill()
      .map((_, i) => ({
        header: (i + 1).toString(),
        dataKey: `hk${i + 1}`,
      })),
    { header: 'Mã HP trước', dataKey: 'maHPTruoc' },
  ];

  // Tạo bảng
  autoTable(doc, {
    startY: startY,
    head: [tableColumns.map(col => col.header)],
    body: tableData,
    theme: 'grid',
    styles: {
      font: 'times',
      fontSize: 10,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 15 }, // TT
      1: { cellWidth: 25 }, // Mã HP
      2: { cellWidth: 80 }, // Tên học phần
      3: { cellWidth: 15, halign: 'center' }, // Số TC
      // Học kỳ 1-12
      4: { cellWidth: 10, halign: 'center' },
      5: { cellWidth: 10, halign: 'center' },
      6: { cellWidth: 10, halign: 'center' },
      7: { cellWidth: 10, halign: 'center' },
      8: { cellWidth: 10, halign: 'center' },
      9: { cellWidth: 10, halign: 'center' },
      10: { cellWidth: 10, halign: 'center' },
      11: { cellWidth: 10, halign: 'center' },
      12: { cellWidth: 10, halign: 'center' },
      13: { cellWidth: 10, halign: 'center' },
      14: { cellWidth: 10, halign: 'center' },
      15: { cellWidth: 10, halign: 'center' },
      16: { cellWidth: 25 }, // Mã HP trước
    },
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      halign: 'center',
    },
    didDrawPage: data => {
      createFooter(doc);
    },
  });

  // Thêm chữ ký
  const pageWidth = doc.internal.pageSize.width;
  let finalY = doc.lastAutoTable.finalY + 20;

  // Kiểm tra nếu cần thêm trang mới
  if (finalY > doc.internal.pageSize.height - 30) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFontSize(11);
  doc.setFont('times', 'bold');
  doc.text('TRƯỞNG KHOA', pageWidth - 50, finalY, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.text('(Ký và ghi rõ họ tên)', pageWidth - 50, finalY + 5, {
    align: 'center',
  });

  // Lưu hoặc mở file PDF
  doc.save('ke-hoach-day-hoc.pdf');
};

export default {
  printKeHoachDayHoc,
};
