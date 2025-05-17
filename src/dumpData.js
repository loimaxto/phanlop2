// 10. PhanCongGiangDay
export const phanCongGiangDayData = [
  {
    id: 1,
    khMoNhom_id: 1,
    giangVien_id: 1,
    soNhom: 2,
    hocKiDay: 1,
    loai: 'Ly thuyet',
    soTietThucHien: 60,
  },
  {
    id: 2,
    khMoNhom_id: 2,
    giangVien_id: 2,
    soNhom: 2,
    hocKiDay: 3,
    loai: 'Thuc hanh',
    soTietThucHien: 40,
  },
  {
    id: 3,
    khMoNhom_id: 3,
    giangVien_id: 3,
    soNhom: 1,
    hocKiDay: 2,
    loai: 'Tat ca',
    soTietThucHien: 50,
  },
  {
    id: 4,
    khMoNhom_id: 4,
    giangVien_id: 4,
    soNhom: 1,
    hocKiDay: 4,
    loai: 'Ly thuyet',
    soTietThucHien: 40,
  },
  {
    id: 5,
    khMoNhom_id: 5,
    giangVien_id: 5,
    soNhom: 1,
    hocKiDay: 5,
    loai: 'Bai tap',
    soTietThucHien: 30,
  },
];
// 1. User
export const userData = [
  {
    id: 1,
    userName: 'admin1',
    email: 'admin1@edu.vn',
    soDienThoai: '0901234567',
    password: 'hashed_password1',
    role: 'Admin',
  },
  {
    id: 2,
    userName: 'giangvien1',
    email: 'gv1@edu.vn',
    soDienThoai: '0901234568',
    password: 'hashed_password2',
    role: 'Giang vien',
  },
  {
    id: 3,
    userName: 'giangvien2',
    email: 'gv2@edu.vn',
    soDienThoai: '0901234569',
    password: 'hashed_password3',
    role: 'Giang vien',
  },
  {
    id: 4,
    userName: 'sinhvien1',
    email: 'sv1@edu.vn',
    soDienThoai: '0901234570',
    password: 'hashed_password4',
    role: 'Sinh vien',
  },
  {
    id: 5,
    userName: 'sinhvien2',
    email: 'sv2@edu.vn',
    soDienThoai: '0901234571',
    password: 'hashed_password5',
    role: 'Sinh vien',
  },
  {
    id: 6,
    userName: 'giangvien3',
    email: 'gv3@edu.vn',
    soDienThoai: '0901234572',
    password: 'hashed_password6',
    role: 'Giang vien',
  },
];

// 2. GiangVien
export const giangVienData = [
  {
    id: 1,
    user_id: 2,
    tenGV: 'Nguyen Van A',
    namSinh: 1975,
    chucDanh: 'Giao su',
    congTacKhac: 'Nghien cuu AI',
  },
  {
    id: 2,
    user_id: 3,
    tenGV: 'Tran Thi B',
    namSinh: 1980,
    chucDanh: 'Pho giao su',
    congTacKhac: 'Phat trien phan mem',
  },
  {
    id: 3,
    user_id: 6,
    tenGV: 'Le Van C',
    namSinh: 1978,
    chucDanh: 'Tien si',
    congTacKhac: 'Tu van cong nghe',
  },
  {
    id: 4,
    user_id: null,
    tenGV: 'Pham Thi D',
    namSinh: 1985,
    chucDanh: 'Thac si',
    congTacKhac: 'Giang day thinh giang',
  },
  {
    id: 5,
    user_id: null,
    tenGV: 'Hoang Van E',
    namSinh: 1970,
    chucDanh: 'Giao su',
    congTacKhac: 'Nghien cuu mang',
  },
];

// 3. ThongTinCTDT
export const thongTinCTDTData = [
  {
    id: 1,
    gioiThieu: 'Chuong trinh dao tao CNTT chat luong cao',
    tenNganh: 'Cong nghe thong tin',
    bac: 'Dai hoc',
    loaiBang: 'Ky su',
    loaiHinhDaoTao: 'Chinh quy',
    thoiGian: 4.5,
    soTinChi: 150,
    khoaQuanLy: 'Khoa CNTT',
    ngonNgu: 'Tieng Viet',
    website: 'https://cntt.edu.vn',
  },
  {
    id: 2,
    gioiThieu: 'Chuong trinh dao tao KTPM voi huong ung dung',
    tenNganh: 'Ky thuat phan mem',
    bac: 'Dai hoc',
    loaiBang: 'Ky su',
    loaiHinhDaoTao: 'Chinh quy',
    thoiGian: 4.0,
    soTinChi: 140,
    khoaQuanLy: 'Khoa CNTT',
    ngonNgu: 'Tieng Viet',
    website: 'https://ktpm.edu.vn',
  },
  {
    id: 3,
    gioiThieu: 'Chuong trinh dao tao KHMT quoc te',
    tenNganh: 'Khoa hoc may tinh',
    bac: 'Dai hoc',
    loaiBang: 'Cu nhan',
    loaiHinhDaoTao: 'Quoc te',
    thoiGian: 4.0,
    soTinChi: 145,
    khoaQuanLy: 'Khoa CNTT',
    ngonNgu: 'Tieng Anh',
    website: 'https://khmt.edu.vn',
  },
  {
    id: 4,
    gioiThieu: 'Chuong trinh dao tao ATTT',
    tenNganh: 'An toan thong tin',
    bac: 'Dai hoc',
    loaiBang: 'Ky su',
    loaiHinhDaoTao: 'Chinh quy',
    thoiGian: 4.5,
    soTinChi: 150,
    khoaQuanLy: 'Khoa ATTT',
    ngonNgu: 'Tieng Viet',
    website: 'https://attt.edu.vn',
  },
  {
    id: 5,
    gioiThieu: 'Chuong trinh dao tao mang may tinh',
    tenNganh: 'Mang may tinh',
    bac: 'Dai hoc',
    loaiBang: 'Ky su',
    loaiHinhDaoTao: 'Chinh quy',
    thoiGian: 4.5,
    soTinChi: 150,
    khoaQuanLy: 'Khoa CNTT',
    ngonNgu: 'Tieng Viet',
    website: 'https://mmt.edu.vn',
  },
];

// 4. KhoiKienThuc
export const khoiKienThucData = [
  { id: 1, ten: 'Kien thuc co so', maChuongTrinhDaoTao: 1 },
  { id: 2, ten: 'Kien thuc chuyen nganh', maChuongTrinhDaoTao: 1 },
  { id: 3, ten: 'Kien thuc co so', maChuongTrinhDaoTao: 2 },
  { id: 4, ten: 'Kien thuc chuyen nganh', maChuongTrinhDaoTao: 3 },
  { id: 5, ten: 'Kien thuc co so', maChuongTrinhDaoTao: 4 },
];

// 5. NhomKienThuc
export const nhomKienThucData = [
  { id: 1, ten: 'Co so nganh', tinhTichLuy: 1, soTinChiTuChonToiThieu: 10, maKhoiKienThuc: 1 },
  { id: 2, ten: 'Chuyen nganh AI', tinhTichLuy: 0, soTinChiTuChonToiThieu: 15, maKhoiKienThuc: 2 },
  { id: 3, ten: 'Co so phan mem', tinhTichLuy: 1, soTinChiTuChonToiThieu: 12, maKhoiKienThuc: 3 },
  {
    id: 4,
    ten: 'Chuyen nganh KHMT',
    tinhTichLuy: 0,
    soTinChiTuChonToiThieu: 20,
    maKhoiKienThuc: 4,
  },
  { id: 5, ten: 'Co so ATTT', tinhTichLuy: 1, soTinChiTuChonToiThieu: 10, maKhoiKienThuc: 5 },
];

// 6. HocPhan
export const hocPhanData = [
  {
    id: 4,
    maHocPhan: 'HP004',
    tenHocPhan: 'Mang may tinh',
    soTinChi: 4,
    soTietLyThuyet: 40,
    soTietBaiTap: 10,
    soTietThucHanh: 20,
    status: true,
    soTietTongCong: 70,
  },
];

// 7. KeHoachDayHoc
export const keHoachDayHocData = [
  { id: 1, maHP: 1, maNhomKienThuc: 1, batBuoc: 1, hocKi: JSON.stringify([1, 2]) },
  { id: 2, maHP: 2, maNhomKienThuc: 1, batBuoc: 0, hocKi: JSON.stringify([3]) },
  { id: 3, maHP: 3, maNhomKienThuc: 3, batBuoc: 1, hocKi: JSON.stringify([2, 3]) },
  { id: 4, maHP: 4, maNhomKienThuc: 5, batBuoc: 1, hocKi: JSON.stringify([4]) },
  { id: 5, maHP: 5, maNhomKienThuc: 2, batBuoc: 0, hocKi: JSON.stringify([5]) },
];

// 8. DeCuongChiTiet
export const deCuongChiTietData = [
  {
    id: 1,
    hocPhan_id: 1,
    diemChuyenCan: 0.1,
    diemBaiTap: 0.2,
    diemThucHanh: 0.0,
    diemNhom: 0.2,
    diemGiuaKi: 0.2,
    diemCuoiKi: 0.3,
  },
  {
    id: 2,
    hocPhan_id: 2,
    diemChuyenCan: 0.1,
    diemBaiTap: 0.2,
    diemThucHanh: 0.2,
    diemNhom: 0.1,
    diemGiuaKi: 0.2,
    diemCuoiKi: 0.2,
  },
  {
    id: 3,
    hocPhan_id: 3,
    diemChuyenCan: 0.1,
    diemBaiTap: 0.1,
    diemThucHanh: 0.3,
    diemNhom: 0.1,
    diemGiuaKi: 0.2,
    diemCuoiKi: 0.2,
  },
  {
    id: 4,
    hocPhan_id: 4,
    diemChuyenCan: 0.1,
    diemBaiTap: 0.1,
    diemThucHanh: 0.2,
    diemNhom: 0.1,
    diemGiuaKi: 0.2,
    diemCuoiKi: 0.3,
  },
  {
    id: 5,
    hocPhan_id: 5,
    diemChuyenCan: 0.1,
    diemBaiTap: 0.2,
    diemThucHanh: 0.0,
    diemNhom: 0.2,
    diemGiuaKi: 0.2,
    diemCuoiKi: 0.3,
  },
];

// 9. KeHoachMoNhom
export const keHoachMoNhomData = [
  {
    id: 1,
    heSo: 1,
    khoa: 'Khoa CNTT',
    tongSoNhom: 5,
    tongSoSinhVien: 150,
    soSinhVien1Nhom: 30,
    namHoc: '2024-2025',
    status: true,
    hocPhan: {
      id: 1,
      maHocPhan: 'HP001',
      tenHocPhan: 'Lap trinh C',
      soTinChi: 3,
      soTietLyThuyet: 30,
      soTietBaiTap: 15,
      soTietThucHanh: 0,
      status: true,
      soTietTongCong: 45,
    },
    phanCongGiangDay: [
      {
        id: 1,
        nhom: '1',
        hocKyDay: 1,
        loai: 'Ly thuyet',
        soTietThucHien: 60,
        soTietThucTe: 60,
        status: true,
        giangVien: {
          id: 1,
          ten: 'Nguyen Van A',
          chucDanh: 'Giao su',
          boMon: 'Cong nghe thong tin',
          khoa: 'Khoa CNTT',
          trinhDo: 'Tien si',
          chuyenMon: 'AI',
          status: true,
        },
      },
    ],
  },
];


// export const curriculumListData = {
//   'code': 200,
//   'statusCode': 200,
//   'message': 'OK',
//   'result': [
//     {
//       'id': 1,
//       'nganhId': '1',
//       'heDaoTao': 'Chính quy',
//       'khoanQuanLy': 'CNNT',
//       'trinhDo': 'Cử nhân',
//       'namBanHanh': 2023,
//       'thoiGianDaoTao': 4,
//       'tinChi': 120,
//       'tongTinChi': 120,

//     },
//     {
//       'id': 2,
//       'nganhId': '2',
//       'heDaoTao': 'Từ xa',
//       'trinhDo': 'Thạc sĩ',
//       'namBanHanh': 2023,
//     },
//   ]
// }