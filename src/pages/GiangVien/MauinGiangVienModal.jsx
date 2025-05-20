import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { getListAll } from '@/services/NganhService';
import { getGiangVienExport } from '@/services/GiangVienService';

const MauinGiangVienModal = ({ show, onClose }) => {
  const [nganhList, setNganhList] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState('');
  const [giangVienData, setGiangVienData] = useState([]);

  useEffect(() => {
    const fetchNganhList = async () => {
      try {
        const data = await getListAll().then(res => res.data);
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
    try {
      const rawData = await getGiangVienExport(selectedNganh);
      console.log(rawData);
      const groupedData = rawData.reduce((acc, item) => {
        if (!acc[item.giangVienID]) acc[item.giangVienID] = [];
        acc[item.giangVienID].push(item);
        return acc;
      }, {});

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Phân công giảng dạy');

      // === Header
      const header1 = [
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
      ];
      const header2 = ['', '', '', '', '', '', '', '', '', '', '1', '2', '3', ''];

      sheet.addRow(header1);
      sheet.addRow(header2);

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
      sheet.mergeCells('K1:M1');
      sheet.mergeCells('N1:N2');

      const applyBorder = cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      };

      ['N1', 'N2'].forEach(cell => {
        const c = sheet.getCell(cell);
        applyBorder(c);
        c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        c.font = { bold: true };
        c.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9D9D9' },
        };
      });

      const applyHeaderStyle = row => {
        row.eachCell(cell => {
          cell.font = { bold: true };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD9D9D9' },
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      };

      applyHeaderStyle(sheet.getRow(1));
      applyHeaderStyle(sheet.getRow(2));

      const applyCellStyle = (row, isBold = false, isGray = false) => {
        row.eachCell(cell => {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.font = { bold: isBold };
          if (isGray) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF2F2F2' },
            };
          }
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      };

      let rowIndex = 3;
      let stt = 1;

      if (Object.keys(groupedData).length === 0) {
        const row = sheet.getRow(rowIndex);
        row.getCell(1).value = 'Không có dữ liệu phân công';
        sheet.mergeCells(`A${rowIndex}:N${rowIndex}`);
        row.font = { italic: true };
        row.alignment = { horizontal: 'center' };
        applyCellStyle(row);
      } else {
        for (const [gvId, hocPhanList] of Object.entries(groupedData)) {
          const first = hocPhanList[0];
          const numRows = hocPhanList.length;
          const start = rowIndex;
          const end = rowIndex + numRows - 1;

          sheet.mergeCells(`A${start}:A${end}`);
          sheet.getCell(`A${start}`).value = stt++;
          sheet.mergeCells(`B${start}:B${end}`);
          sheet.getCell(`B${start}`).value = first.giangVienID;
          sheet.mergeCells(`C${start}:C${end}`);
          sheet.getCell(`C${start}`).value = first.tenGV;
          sheet.mergeCells(`D${start}:D${end}`);
          sheet.getCell(`D${start}`).value = first.namSinh;
          sheet.mergeCells(`E${start}:E${end}`);
          sheet.getCell(`E${start}`).value = first.chucDanh;
          sheet.mergeCells(`F${start}:F${end}`);
          sheet.getCell(`F${start}`).value = first.khoa;

          let totalTietGV = 0;

          hocPhanList.forEach(hp => {
            const row = sheet.getRow(rowIndex);
            row.getCell(7).value = hp.tenHP;
            row.getCell(8).value = hp.maHP;
            row.getCell(9).value = hp.soTC;
            row.getCell(10).value = hp.soTiet;
            row.getCell(11).value = hp.hk1;
            row.getCell(12).value = hp.hk2;
            row.getCell(13).value = hp.hk3;
            applyBorder(row.getCell(14));


            const totalThisHP =
              (Number(hp.hk1) + Number(hp.hk2) + Number(hp.hk3)) * Number(hp.soTiet);
            totalTietGV += totalThisHP;

            applyCellStyle(row);
            rowIndex++;
          });

          // Dòng tổng cộng
          const totalRow = sheet.getRow(rowIndex);
          totalRow.getCell(1).value = 'Tổng cộng';
          sheet.mergeCells(`A${rowIndex}:M${rowIndex}`);
          totalRow.getCell(14).value = totalTietGV;
          applyCellStyle(totalRow, true, true);
          rowIndex++;

        }
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

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), `PhanCongGiangDay_${selectedNganh}.xlsx`);
    } catch (err) {
      console.error('Lỗi export:', err);
      alert('Xuất file thất bại!');
    }
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
