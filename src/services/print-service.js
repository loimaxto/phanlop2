import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import '../assets/fonts/times-normal.js';
import '../assets/fonts/times-bold.js';
import { integerToRoman } from './helpers.js';

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

export const printKeHoachDayHoc = (
  tenNganh = 'Công nghệ thông tin',
  keHoachData,
  nhomKienThucData,
  khoiKienThucData,
  selectedGroup = 'all',
  searchTerm = ''
) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  const startY = createHeader(doc, 'KẾ HOẠCH DẠY HỌC', tenNganh);

  // Lọc và group như cũ
  const filteredData = keHoachData.filter(item => {
    const matchesSearch =
      item.maHP.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenHocPhan.toLowerCase().includes(searchTerm.toLowerCase());
    return selectedGroup === 'all'
      ? matchesSearch
      : matchesSearch && item.nhomKienThucId == selectedGroup;
  });

  const groupedDataByKhoi = {};
  khoiKienThucData.forEach(khoi => {
    groupedDataByKhoi[khoi.id] = {
      nhom: {},
      items: filteredData.filter(item => item.khoiKienThucId === khoi.id),
    };
    nhomKienThucData
      .filter(nhom => nhom.khoiKienThucId === khoi.id)
      .forEach(nhom => {
        groupedDataByKhoi[khoi.id].nhom[nhom.id] = filteredData.filter(
          item => item.nhomKienThucId === nhom.id
        );
      });
  });

  const tableData = [];
  let stt = 1;

  khoiKienThucData.forEach((khoi, khoiIndex) => {
    const khoiItems = groupedDataByKhoi[khoi.id]?.items || [];
    if (khoiItems.length === 0 && selectedGroup !== 'all') return;
    const nhomInKhoi = nhomKienThucData.filter(nhom => nhom.khoiKienThucId === khoi.id);
    const khoiTotalTC = khoiItems.reduce((sum, item) => sum + item.soTinChi, 0);
    tableData.push([
      {
        content: `${integerToRoman(khoiIndex + 1)}. ${khoi.name} (${khoiItems.length} học phần)`,
        colSpan: 3,
        styles: {
          fontStyle: 'bold',
          fillColor: [200, 200, 200],
          textColor: [0, 0, 0],
          halign: 'left',
          lineWidth: 0.1,
        },
      },
      {
        content: khoiTotalTC,
        colSpan: 1,
        styles: {
          halign: 'center',
          fillColor: [200, 200, 200],
        },
      },
      {
        content: '',
        colSpan: 13,
        styles: {
          fillColor: [200, 200, 200],
        },
      },
    ]);

    nhomInKhoi.forEach((nhom, nhomIndex) => {
      const nhomItems = groupedDataByKhoi[khoi.id].nhom[nhom.id] || [];
      if (nhomItems.length === 0 && selectedGroup !== 'all') return;
      const nhomTotalTC = nhomItems.reduce((sum, item) => sum + item.soTinChi, 0);

      tableData.push([
        {
          content: `${nhomIndex + 1}. ${nhom.tenNhom} (${nhomItems.length} học phần)`,
          colSpan: 3,
          styles: {
            fontStyle: 'bold',
            fillColor: [220, 220, 220],
            textColor: [0, 0, 0],
            halign: 'left',
            lineWidth: 0.1,
          },
        },
        {
          content: nhomTotalTC,
          colSpan: 1,
          styles: {
            halign: 'center',
            fillColor: [220, 220, 220],
          },
        },
        {
          content: '',
          colSpan: 13,
          styles: {
            fillColor: [220, 220, 220],
          },
        },
      ]);

      nhomItems.forEach(course => {
        const semesters = Array(12).fill('');
        course.hocKi.forEach(hk => {
          semesters[hk - 1] = 'x';
        });

        tableData.push([
          stt++,
          course.maHP,
          course.tenHocPhan,
          course.soTinChi,
          ...semesters,
          course.maHocPhanTruoc || '',
        ]);
      });
    });
  });

  // Tổng cộng cuối
  const totalAll = filteredData.reduce((sum, item) => sum + item.soTinChi, 0);
  tableData.push([
    {
      content: 'TỔNG CỘNG',
      colSpan: 3,
      styles: {
        fontStyle: 'bold',
        fillColor: [180, 180, 180],
        textColor: [0, 0, 0],
        halign: 'left',
      },
    },
    { content: totalAll, styles: { halign: 'center', fillColor: [180, 180, 180] } },
    {
      content: '',
      colSpan: 13,
      styles: {
        fillColor: [180, 180, 180],
      },
    },
  ]);

  const tableHead = [
    [
      { content: 'TT', rowSpan: 2, styles: { align: 'auto' } },
      { content: 'Mã HP', rowSpan: 2, styles: { align: 'auto' } },
      { content: 'Tên học phần', rowSpan: 2, styles: { align: 'auto' } },
      { content: 'Số TC', rowSpan: 2, styles: { align: 'auto' } },
      { content: 'Học kỳ thực hiện', colSpan: 12, styles: { halign: 'center' } },
      { content: 'Mã HP trước', rowSpan: 2, styles: { align: 'auto' } },
    ],
    [
      ...Array.from({ length: 12 }, (_, i) => ({
        content: `${i + 1}`,
        styles: { halign: 'center' },
      })),
    ],
  ];

  autoTable(doc, {
    startY,
    head: tableHead,
    body: tableData,
    theme: 'grid',
    styles: {
      font: 'times',
      fontSize: 10,
      textColor: [0, 0, 0],
      cellPadding: 2,
      overflow: 'linebreak',
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 25 },
      2: { cellWidth: 70 },
      3: { cellWidth: 15, halign: 'center' },
      ...[...Array(12)].reduce(
        (obj, _, i) => ({ ...obj, [4 + i]: { cellWidth: 10, halign: 'center' } }),
        {}
      ),
      16: { cellWidth: 25 },
    },
    headStyles: {
      fillColor: [255, 255, 255],
      fontStyle: 'bold',
    },
  });

  // Footer
  const pageWidth = doc.internal.pageSize.width;
  const finalY = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(11).setFont('times', 'bold');
  doc.text('TRƯỞNG KHOA', pageWidth - 50, finalY, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.text('(Ký và ghi rõ họ tên)', pageWidth - 50, finalY + 5, { align: 'center' });

  doc.save('ke-hoach-day-hoc.pdf');
};

// Hàm in kế hoạch mở nhóm theo học kỳ, CHUA THAY DUNG
export const printKeHoachMoNhomTheoHocKy = (hocKy, keHoachData) => {
  // Khởi tạo PDF với khổ giấy A4 nằm ngang
  const doc = new jsPDF('landscape', 'mm', 'a4');

  // Tạo header
  const startY = createHeader(doc, `KẾ HOẠCH MỞ NHÓM THEO HỌC KỲ ${hocKy}`);

  // Lọc dữ liệu theo học kỳ
  const filteredData = keHoachData
    .map(item => ({
      ...item,
      phanCongGiangDay: item.phanCongGiangDay.filter(pc => pc.hocKyDay === hocKy),
    }))
    .filter(item => item.phanCongGiangDay.length > 0);

  // Chuẩn bị dữ liệu cho bảng
  const tableData = [];
  let currentIndex = 1; // Số thứ tự

  // Thêm dữ liệu từng học phần vào bảng
  filteredData.forEach(plan => {
    plan.phanCongGiangDay.forEach(assignment => {
      tableData.push([
        currentIndex++, // STT
        plan.hocPhan.maHocPhan, // Mã HP
        plan.hocPhan.tenHocPhan, // Tên học phần
        plan.soSinhVien1Nhom, // Sĩ số/nhóm
        plan.tongSoNhom, // Số nhóm
        plan.tongSoSinhVien, // Tổng số SV
        assignment.soNhom, // Số nhóm CBGD
        assignment.giangVien.ten, // Họ và tên CBGD
        assignment.soTietThucHien, // Số tiết thực hiện
        assignment.soTietThucTe, // Số tiết thực tế
      ]);
    });
  });

  // Cấu hình cột cho bảng
  const tableColumns = [
    { header: 'STT', dataKey: 'stt' },
    { header: 'Mã HP', dataKey: 'maHP' },
    { header: 'Tên học phần', dataKey: 'tenHP' },
    { header: 'Sĩ số/nhóm', dataKey: 'siSoNhom' },
    { header: 'Số nhóm', dataKey: 'soNhom' },
    { header: 'Tổng số SV', dataKey: 'tongSoSV' },
    { header: 'Số nhóm CBGD', dataKey: 'soNhomCBGD' },
    { header: 'Họ và tên CBGD', dataKey: 'hoTenCBGD' },
    { header: 'Số tiết thực hiện', dataKey: 'soTietThucHien' },
    { header: 'Số tiết thực tế', dataKey: 'soTietThucTe' },
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
      0: { cellWidth: 15, halign: 'center' }, // STT
      1: { cellWidth: 25, halign: 'center' }, // Mã HP
      2: { cellWidth: 70 }, // Tên học phần
      3: { cellWidth: 20, halign: 'center' }, // Sĩ số/nhóm
      4: { cellWidth: 20, halign: 'center' }, // Số nhóm
      5: { cellWidth: 25, halign: 'center' }, // Tổng số SV
      6: { cellWidth: 25, halign: 'center' }, // Số nhóm CBGD
      7: { cellWidth: 40 }, // Họ và tên CBGD
      8: { cellWidth: 25, halign: 'center' }, // Số tiết thực hiện
      9: { cellWidth: 25, halign: 'center' }, // Số tiết thực tế
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
  doc.text('TRƯỜNG PHÒNG ĐÀO TẠO', pageWidth / 2 - 50, finalY, { align: 'center' });
  doc.text('TRƯỞNG KHOA', pageWidth / 2 + 50, finalY, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.text('(Ký và ghi rõ họ tên)', pageWidth / 2 - 50, finalY + 5, { align: 'center' });
  doc.text('(Ký và ghi rõ họ tên)', pageWidth / 2 + 50, finalY + 5, { align: 'center' });

  // Lưu hoặc mở file PDF
  doc.save(`ke-hoach-mo-nhom-hoc-ky-${hocKy}.pdf`);
};

export const printKeHoachMoNhom = (
  keHoachData,
  schoolName = 'TRƯỜNG ĐẠI HỌC XYZ',
  departmentName = 'KHOA ABC',
  tenNganh = 'Công nghệ thông tin'
) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;

  // Header như cũ...
  doc.setFont('times', 'bold').setFontSize(11);
  doc.text(schoolName, 20, 20);
  doc.setFont('times', 'normal');
  doc.text(departmentName, 20, 25);
  doc.setFont('times', 'bold');
  doc.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', pageWidth - 20, 20, { align: 'right' });
  doc.setFont('times', 'normal');
  doc.text('Độc lập - Tự do - Hạnh phúc', pageWidth - 20, 25, { align: 'right' });
  doc.line(20, 30, pageWidth - 20, 30);

  doc.setFontSize(16).setFont('times', 'bold');
  doc.text('KẾ HOẠCH MỞ NHÓM GIẢNG DẠY TỔNG HỢP', pageWidth / 2, 45, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`Ngành: ${tenNganh}`, pageWidth / 2, 52, { align: 'center' });
  doc.setFontSize(11).setFont('times', 'normal');
  const currentDate = format(new Date(), "dd 'tháng' MM 'năm' yyyy", { locale: vi });
  doc.text(`Ngày in: ${currentDate}`, pageWidth / 2, 58, { align: 'center' });

  let startY = 65;

  const tableHead = [
    [
      { content: 'STT', rowSpan: 2 },
      { content: 'Mã HP', rowSpan: 2 },
      { content: 'Tên học phần', rowSpan: 2 },
      { content: 'Số TC', rowSpan: 2 },
      { content: 'Khóa', rowSpan: 2 },
      { content: 'SỐ TIẾT', colSpan: 4, styles: { halign: 'center' } }, // ✅ Gom nhóm 4 cột
      { content: 'Hệ số HP', rowSpan: 2 },
      { content: 'Tổng số nhóm', rowSpan: 2 },
      { content: 'SLSV/Nhóm', rowSpan: 2 },
      { content: 'Nhóm', rowSpan: 2 },
      { content: 'Mã CBGD', rowSpan: 2 },
      { content: 'Họ và tên CBGD', rowSpan: 2 },
      { content: 'Số tiết thực hiện', rowSpan: 2 },
      { content: 'Số tiết thực tế', rowSpan: 2 },
    ],
    ['LT', 'BT', 'TH', 'TC'],
  ];

  const tableBody = [];

  let stt = 1;
  keHoachData.forEach(item => {
    const phanCongCount = item.phanCongGiangDay.length || 1;

    const mainRow = [
      { content: stt++, rowSpan: phanCongCount },
      { content: item.hocPhan.maHocPhan, rowSpan: phanCongCount },
      { content: item.hocPhan.tenHocPhan, rowSpan: phanCongCount },
      { content: item.hocPhan.soTinChi, rowSpan: phanCongCount },
      { content: item.khoa, rowSpan: phanCongCount },
      { content: item.hocPhan.soTietLyThuyet, rowSpan: phanCongCount },
      { content: item.hocPhan.soTietBaiTap, rowSpan: phanCongCount },
      { content: item.hocPhan.soTietThucHanh, rowSpan: phanCongCount },
      { content: item.hocPhan.soTietTongCong, rowSpan: phanCongCount },
      { content: item.heSo, rowSpan: phanCongCount },
      { content: item.tongSoNhom, rowSpan: phanCongCount },
      { content: item.soSinhVien1Nhom, rowSpan: phanCongCount },
    ];

    if (phanCongCount > 0) {
      item.phanCongGiangDay.forEach((pc, index) => {
        const pcRow = [
          pc.nhom,
          pc.giangVien.id,
          pc.giangVien.ten,
          pc.soTietThucHien,
          pc.soTietThucTe,
        ];
        if (index === 0) {
          tableBody.push([...mainRow, ...pcRow]);
        } else {
          tableBody.push([...pcRow]);
        }
      });
    } else {
      tableBody.push([...mainRow, '', '', '', '', '']);
    }
  });

  autoTable(doc, {
    startY: startY,
    head: tableHead,
    body: tableBody,
    theme: 'grid',
    tableWidth: 'auto', // Giữ auto-fit khổ giấy A4 landscape
    styles: {
      font: 'times',
      fontSize: 10,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      overflow: 'linebreak', // ✅ Đây là cài đặt wrap chuẩn 'word wrap'
    },
    columnStyles: {
      2: { overflow: 'linebreak', minCellWidth: 50 }, // Tên học phần
      14: { overflow: 'linebreak', minCellWidth: 40 }, // Tên giảng viên
      0: { halign: 'center' },
      3: { halign: 'center' },
      5: { halign: 'center' },
      6: { halign: 'center' },
      7: { halign: 'center' },
      8: { halign: 'center' },
      9: { halign: 'center' },
      10: { halign: 'center' },
      11: { halign: 'center' },
      12: { halign: 'center' },
      15: { halign: 'center' },
      16: { halign: 'center' },
    },
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      halign: 'center',
    },
    didDrawPage: () => {
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10).setFont('times', 'normal');
      doc.text(`Trang ${doc.internal.getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, {
        align: 'center',
      });
    },
  });

  // Footer chữ ký
  const finalY = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(11).setFont('times', 'bold');
  doc.text('TRƯỞNG KHOA', pageWidth - 50, finalY, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.text('(Ký và ghi rõ họ tên)', pageWidth - 50, finalY + 5, { align: 'center' });

  doc.save(`ke-hoach-mo-nhom.pdf`);
};

// bang phan cong cong tac giang vien
export const printKeHoachMoNhomTongHop = (
  data,
  namHoc,
  schoolName = 'TRƯỜNG ĐẠI HỌC XYZ',
  departmentName = 'KHOA ABC'
) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;

  // Header quốc hiệu, đơn vị
  doc.setFont('times', 'bold').setFontSize(11);
  doc.text(schoolName, 20, 20);
  doc.setFont('times', 'normal');
  doc.text(departmentName, 20, 25);
  doc.setFont('times', 'bold');
  doc.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', pageWidth - 20, 20, { align: 'right' });
  doc.setFont('times', 'normal');
  doc.text('Độc lập - Tự do - Hạnh phúc', pageWidth - 20, 25, { align: 'right' });
  doc.line(20, 30, pageWidth - 20, 30);

  doc.setFontSize(14).setFont('times', 'bold');
  doc.text(
    'BẢNG PHÂN CÔNG CÔNG TÁC CỦA CÁN BỘ, GIẢNG VIÊN CƠ HỮU NĂM HỌC ' + namHoc,
    pageWidth / 2,
    40,
    {
      align: 'center',
    }
  );

  doc.setFontSize(11).setFont('times', 'normal');
  const currentDate = format(new Date(), "dd 'tháng' MM 'năm' yyyy", { locale: vi });
  doc.text(`Ngày in: ${currentDate}`, pageWidth / 2, 48, { align: 'center' });

  const startY = 55;

  // Header bảng
  const tableHead = [
    [
      { content: 'STT', rowSpan: 3 },
      { content: 'Mã CB', rowSpan: 3 },
      { content: 'Họ và tên GV', rowSpan: 3 },
      { content: 'Năm sinh', rowSpan: 3 },
      { content: 'Chức danh,\nhọc vị', rowSpan: 3 },
      { content: 'Phân công giảng dạy', colSpan: 9, styles: { halign: 'center' } },
    ],
    [
      { content: 'Tên học phần', rowSpan: 2 },
      { content: 'Mã học phần', rowSpan: 2 },
      { content: 'Số TC', rowSpan: 2 },
      { content: 'Số tiết của HP', rowSpan: 2 },
      { content: 'Số lượng lớp, nhóm', rowSpan: 2 },
      { content: 'Giảng dạy ở học kì', colSpan: 3, styles: { halign: 'center' } },
      { content: 'Tổng số tiết giảng dạy của GV', rowSpan: 2 },
    ],
    ['1', '2', '3'],
  ];

  const tableBody = [];
  let stt = 1;
  data.forEach(gv => {
    const phanCongCount = gv.phanCongGiangDay.length;
    gv.phanCongGiangDay.forEach((pc, index) => {
      const hocKyCols = ['', '', ''];
      pc.hocKyDay.forEach(hk => {
        if (hk >= 1 && hk <= 3) hocKyCols[hk - 1] = 'x';
      });

      // index === 0 ? { content: stt++, rowSpan: phanCongCount } : '',
      //   index === 0 ? { content: gv.giangVien.maGiangVien, rowSpan: phanCongCount } : '',
      //   index === 0 ? { content: gv.giangVien.hoVaTen, rowSpan: phanCongCount } : '',
      //   index === 0 ? { content: gv.giangVien.namSinh, rowSpan: phanCongCount } : '',
      //   index === 0 ? { content: gv.giangVien.chucDanh, rowSpan: phanCongCount } : '',

      const temp =
        index === 0
          ? [
              { content: stt++, rowSpan: phanCongCount },
              { content: gv.giangVien.maGiangVien, rowSpan: phanCongCount },
              { content: gv.giangVien.hoVaTen, rowSpan: phanCongCount },
              { content: gv.giangVien.namSinh, rowSpan: phanCongCount },
              { content: gv.giangVien.chucDanh, rowSpan: phanCongCount },
            ]
          : [];

      const row = [
        ...temp,
        pc.tenHocPhan,
        pc.maHocPhan,
        pc.soTinChi,
        pc.soTietHocPhan,
        pc.soLuongNhomLop,
        ...hocKyCols,
        pc.tongSoTietDay,
      ];
      tableBody.push(row);
    });

    // Dòng tổng cộng của GV
    tableBody.push([
      { content: 'Tổng cộng', colSpan: 13, styles: { fontStyle: 'bold', halign: 'center' } },
      gv.phanCongGiangDay.reduce((sum, pc) => sum + pc.tongSoTietDay, 0),
    ]);
  });

  autoTable(doc, {
    startY,
    head: tableHead,
    body: tableBody,
    tableWidth: 'auto',
    theme: 'grid',
    styles: {
      font: 'times',
      fontSize: 10,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 15, halign: 'center' },
      2: { cellWidth: 40 },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 20 },
      5: { cellWidth: 60 },
      6: { cellWidth: 20 },
      7: { cellWidth: 10, halign: 'center' },
      8: { cellWidth: 15, halign: 'center' },
      9: { cellWidth: 15, halign: 'center' },
      10: { cellWidth: 10, halign: 'center' },
      11: { cellWidth: 10, halign: 'center' },
      12: { cellWidth: 10, halign: 'center' },
      13: { cellWidth: 20, halign: 'center' },
    },
    headStyles: {
      fillColor: [220, 220, 220],
      fontStyle: 'bold',
      halign: 'center',
    },
    didDrawPage: () => {
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10).setFont('times', 'normal');
      doc.text(`Trang ${doc.internal.getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, {
        align: 'center',
      });
    },
  });

  const pageHeight = doc.internal.pageSize.height;
  let finalY = doc.lastAutoTable.finalY + 20;
  const marginBottom = 30; // khoảng cách an toàn cuối trang

  // Nếu không đủ chỗ -> thêm trang mới
  if (finalY > pageHeight - marginBottom) {
    doc.addPage();
    finalY = 20; // vị trí đầu trang mới
  }

  // Footer chữ ký
  doc.setFontSize(11).setFont('times', 'bold');
  doc.text('TRƯỞNG KHOA', pageWidth - 50, finalY, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.text('(Ký và ghi rõ họ tên)', pageWidth - 50, finalY + 5, { align: 'center' });

  doc.save(`bang-phan-cong-giang-vien-${namHoc}.pdf`);
};

export default {
  printKeHoachDayHoc,
  printKeHoachMoNhomTheoHocKy,
  printKeHoachMoNhom,
  printKeHoachMoNhomTongHop,
};
