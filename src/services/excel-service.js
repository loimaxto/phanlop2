import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { API_BASE_URL } from '../config/apiConfig';
import axios from 'axios';

const API_URL = API_BASE_URL + '/api/v1/giang-vien';

const importGiangVienFromExcel = async file => {
  const errors = [];
  const workbook = new ExcelJS.Workbook();

  try {
    // Read the Excel file
    await workbook.xlsx.load(file);
    const worksheet = workbook.worksheets[0]; // Get the first worksheet

    // Iterate over each row, starting from row 2 (assuming row 1 is header)
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const giangVien = {
        userId: Number(row.getCell(1).value),
        ten: row.getCell(2).value?.toString(),
        chucDanh: row.getCell(3).value?.toString(),
        boMon: row.getCell(4).value?.toString(),
        khoa: row.getCell(5).value?.toString(),
        trinhDo: row.getCell(6).value?.toString(),
        chuyenMon: row.getCell(7).value?.toString(),
        namSinh: Number(row.getCell(8).value),
      };

      // Validate required fields
      if (!giangVien.userId || !giangVien.ten || !giangVien.namSinh) {
        errors.push(`Row ${i}: Missing required fields (userId, ten, or namSinh)`);
        continue;
      }

      // Send POST request for each row
      try {
        await axios.post(`${API_URL}/them`, giangVien);
      } catch (error) {
        errors.push(`Row ${i}: Failed to add giang vien - ${error.message}`);
      }
    }

    // Log errors if any
    if (errors.length > 0) {
      console.error('Errors during import:', errors);
    }

    return { success: errors.length === 0, errors };
  } catch (error) {
    console.error('Failed to process Excel file:', error);
    return { success: false, errors: ['Failed to process Excel file'] };
  }
};

export { importGiangVienFromExcel };
