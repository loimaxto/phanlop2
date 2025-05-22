import React, { useEffect, useState } from 'react';
import { getChuongTrinhKhungByThongTinChungId } from '@services/ThongTinChungService';
import { NavLink } from 'react-router';

function CTKhung({ id, isOpen, onClose }) {
  const [cTKhung, setCTKhung] = useState([]);

  const fetchData = async id => {
    // const response = {
    //   statusCode: 200,
    //   metadata: null,
    //   message: 'Get Chuong Trinh Khung Success',
    //   data: [
    //     {
    //       tenKhoiKienThuc: 'Giao duc dai cuong',
    //       nhomKienThucChuongOfKhoiKienThuc: [
    //         {
    //           tenNhom: 'Chinh Tri',
    //           tichLuy: true,
    //           soTinChiBatBuoc: 10,
    //           soTinChiTuChon: 0,
    //         },
    //         {
    //           tenNhom: 'Dao Duc',
    //           tichLuy: true,
    //           soTinChiBatBuoc: 15,
    //           soTinChiTuChon: 0,
    //         },
    //         {
    //           tenNhom: 'Giao Duc Quoc Phong',
    //           tichLuy: false,
    //           soTinChiBatBuoc: 15,
    //           soTinChiTuChon: 0,
    //         },
    //       ],
    //     },
    //     {
    //       tenKhoiKienThuc: 'Chuyen Nganh Co Ban',
    //       nhomKienThucChuongOfKhoiKienThuc: [
    //         {
    //           tenNhom: 'Ly Thuyet',
    //           tichLuy: true,
    //           soTinChiBatBuoc: 20,
    //           soTinChiTuChon: 6,
    //         },
    //         {
    //           tenNhom: 'Thuc Hanh',
    //           tichLuy: true,
    //           soTinChiBatBuoc: 20,
    //           soTinChiTuChon: 0,
    //         },
    //       ],
    //     },
    //   ],
    // };

    const response = await getChuongTrinhKhungByThongTinChungId(id);
    setCTKhung(response.data);
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchData(id);
  }, [id, isOpen]);

  if (!isOpen || !cTKhung) return null;

  if (cTKhung.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Không có chương trình khung (Mã-{id})
          </h2>

          <div className="text-center text-gray-500">
            Không có dữ liệu chương trình khung cho mã này.
          </div>

          <div className="text-right mt-4">
            <button className="btn btn-outline" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  let totalTichLuy = 0;
  let totalBatBuoc = 0;
  let totalTuChon = 0;

  const renderedRows = [];

  cTKhung.forEach((khoi, khoiIndex) => {
    let subBatBuoc = 0;
    let subTuChon = 0;

    renderedRows.push(
      <tr key={`khoi-${khoiIndex}`} className="bg-gray-100 font-semibold">
        <td className="border px-4 py-2" colSpan={4}>
          Khối kiến thức: {khoi.tenKhoiKienThuc}
        </td>
      </tr>
    );

    khoi.nhomKienThucChuongOfKhoiKienThuc.forEach((nhom, nhomIndex) => {
      subBatBuoc += nhom.soTinChiBatBuoc;
      subTuChon += nhom.soTinChiToiThieu;

      if (nhom.tichLuy) {
        totalTichLuy += nhom.soTinChiBatBuoc + nhom.soTinChiTuChon;
      }

      totalBatBuoc += nhom.soTinChiBatBuoc;
      totalTuChon += nhom.soTinChiToiThieu;

      renderedRows.push(
        <tr key={`nhom-${khoiIndex}-${nhomIndex}`}>
          <td className="border px-4 py-2">{nhom.tenNhom}</td>
          <td className="border px-4 py-2 text-center">{nhom.soTinChiTuChon}</td>
          <td className="border px-4 py-2 text-center">{nhom.soTinChiBatBuoc}</td>
          <td className="border px-4 py-2 text-center">
            {nhom.tichLuy ? '✔️' : '❌'}{' '}
            {!nhom.tichLuy && (
              <span className="text-red-500 text-xs italic ml-1">Không tính vào tích lũy</span>
            )}
          </td>
        </tr>
      );
    });

    renderedRows.push(
      <tr key={`khoi-total-${khoiIndex}`} className="bg-yellow-100 font-medium">
        <td className="border px-4 py-2 text-right">Tổng khối</td>
        <td className="border px-4 py-2 text-center">{subTuChon} (Tối thiểu)</td>
        <td className="border px-4 py-2 text-center">{subBatBuoc}</td>
        <td className="border px-4 py-2"></td>
      </tr>
    );
  });

  renderedRows.push(
    <tr key="grand-total" className="bg-green-100 font-bold">
      <td className="border px-4 py-2 text-right">Tổng toàn chương trình</td>
      <td className="border px-4 py-2 text-center">{totalTuChon}</td>
      <td className="border px-4 py-2 text-center">{totalBatBuoc}</td>
      <td className="border px-4 py-2 text-center">{totalTichLuy} tín chỉ tích lũy</td>
    </tr>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[750px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Chương trình khung của CTDT (Mã-{id})
        </h2>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2 text-left">Khối / Nhóm kiến thức</th>
              <th className="border px-4 py-2 text-center">Số tín chỉ tự chọn</th>
              <th className="border px-4 py-2 text-center">Số tín chỉ bắt buộc</th>
              <th className="border px-4 py-2 text-center">Tính tích lũy</th>
            </tr>
          </thead>
          <tbody>{renderedRows}</tbody>
        </table>

        <div className="text-right mt-4">
          <NavLink className="btn btn-primary me-4" to={`/ctdt/${id}`}>
            Xem chi tiết
          </NavLink>
          <button className="btn btn-outline" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default CTKhung;
