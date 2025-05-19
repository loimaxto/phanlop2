import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

const MauinGiangVienModal = ({ show, onClose }) => {
  const [nganhList, setNganhList] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState('');
  const [giangVienData, setGiangVienData] = useState([]);

  useEffect(() => {
    const fetchNganhList = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/nganh/get-list');
        const data = await res.json().then(res => res.data);
        // console.log({ data });
        setNganhList(data);
        if (data.length > 0) {
          setSelectedNganh(data[0].tenNganh);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngành:', error);
      }
    };

    if (show) {
      fetchNganhList();
    }
  }, [show]);

  const handleExport = async () => {
    const res = await fetch(`http://localhost:8080/api/phanconggiangday/khoa/${selectedNganh}`);
    const rawData = await res.json().then(res => res.data);
    console.log(rawData);
    const groupedData = rawData.reduce((acc, item) => {
      if (!acc[item.GiangVienID]) acc[item.GiangVienID] = [];
      acc[item.GiangVienID].push(item);
      return acc;
    }, {});

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Phân công giảng dạy');

    // === Header
    sheet.addRow([
      'STT',
      'Mã CB',
      'Họ và tên GV',
      'Năm sinh',
      'Chức danh, học vị',
      'Khoa',
      'Tên học phần',
      'Mã học phần',
      'Số TC',
      'Số tiết của HP',
      'Giảng dạy ở học kì',
      '',
      '',
      'Tổng số tiết giảng dạy của GV',
    ]);

    sheet.addRow(['', '', '', '', '', '', '', '', '', '', '1', '2', '3', '']);

    // Merge header cells
    sheet.mergeCells('A1:A2');
    sheet.mergeCells('B1:B2');
    sheet.mergeCells('C1:C2');
    sheet.mergeCells('D1:D2');
    sheet.mergeCells('E1:E2');
    sheet.mergeCells('F1:F2');
    sheet.mergeCells('G1:G2');
    sheet.mergeCells('H1:H2');
    sheet.mergeCells('I1:I2');
    sheet.mergeCells('J1:J2');
    sheet.mergeCells('K1:M1'); // "Giảng dạy ở học kì"
    sheet.mergeCells('N1:N2'); // Tổng số tiết giảng dạy của GV

    let rowIndex = 3; // bắt đầu từ dòng thứ 3
    let stt = 1;

    for (const [gvId, hocPhanList] of Object.entries(groupedData)) {
      const first = hocPhanList[0];

      // Merge các thông tin cố định của giảng viên theo số dòng học phần
      const numRows = hocPhanList.length;
      const start = rowIndex;
      const end = rowIndex + numRows - 1;

      // Merge cột
      sheet.mergeCells(`A${start}:A${end}`);
      sheet.getCell(`A${start}`).value = stt++;
      sheet.mergeCells(`B${start}:B${end}`);
      sheet.getCell(`B${start}`).value = first.GiangVienID;
      sheet.mergeCells(`C${start}:C${end}`);
      sheet.getCell(`C${start}`).value = first.TenGV;
      sheet.mergeCells(`D${start}:D${end}`);
      sheet.getCell(`D${start}`).value = first.NamSinh;
      sheet.mergeCells(`E${start}:E${end}`);
      sheet.getCell(`E${start}`).value = first.ChucDanh;
      sheet.mergeCells(`F${start}:F${end}`);
      sheet.getCell(`F${start}`).value = first.khoa;

      let totalTietGV = 0;

      hocPhanList.forEach((hp, idx) => {
        const currentRow = sheet.getRow(rowIndex);
        currentRow.getCell(7).value = hp.TenHP;
        currentRow.getCell(8).value = hp.MAHP;
        currentRow.getCell(9).value = hp.SoTC;
        currentRow.getCell(10).value = hp.SoTiet;
        currentRow.getCell(11).value = hp.hk1;
        currentRow.getCell(12).value = hp.hk2;
        currentRow.getCell(13).value = hp.hk3;

        const totalThisHP = (Number(hp.hk1) + Number(hp.hk2) + Number(hp.hk3)) * Number(hp.SoTiet);
        totalTietGV += totalThisHP;

        rowIndex++;
      });

      // Thêm dòng Tổng cộng
      const totalRow = sheet.getRow(rowIndex);
      totalRow.getCell(1).value = 'Tổng cộng';
      sheet.mergeCells(`A${rowIndex}:M${rowIndex}`);
      totalRow.getCell(14).value = totalTietGV;

      rowIndex++;
    }

    // Auto width
    sheet.columns.forEach(col => {
      let maxLength = 10;
      col.eachCell({ includeEmpty: true }, cell => {
        const len = cell.value?.toString().length || 10;
        if (len > maxLength) maxLength = len;
      });
      col.width = maxLength + 2;
    });

    // Xuất file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `PhanCongGiangDay_${selectedNganh}.xlsx`);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-center">Xuất mẫu in theo ngành</h3>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Chọn ngành</label>
          <select
            className="select select-bordered w-full"
            value={selectedNganh}
            onChange={e => setSelectedNganh(e.target.value)}
          >
            {nganhList.map(nganh => (
              <option key={nganh.tenNganh} value={nganh.tenNganh}>
                {nganh.tenNganh}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Huỷ
          </button>
          <button className="btn btn-primary" onClick={handleExport}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default MauinGiangVienModal;
