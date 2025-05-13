import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getListAll } from '@services/NganhService';
import { updateThongTinChung, getThongTinChungById } from '@services/ThongTinChungService';

function UpdateCTDT({ id, isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nganhId: '',
    khoaQuanLy: '',
    loaiHinhDaoTao: '', // đã sửa đúng key
    loaiBang: '',
    tongTinChi: '',
    thoiGianDaoTao: '',
    banHanh: '',
    website: '',
    ngonNgu: '',
  });
  const [industries, setIndustries] = useState([]);

  const fetchData = async () => {
    try {
      const responeNganh = await getListAll();
      setIndustries(responeNganh.data);

      const responseThongTinChung = await getThongTinChungById(id);
      const dataThongTinChung = responseThongTinChung.data;

      setFormData({
        nganhId: dataThongTinChung.nganh?.id || '',
        khoaQuanLy: dataThongTinChung.khoaQuanLy || '',
        loaiBang: dataThongTinChung.loaiBang || '',
        loaiHinhDaoTao: dataThongTinChung.loaiHinhDaoTao || '',
        tongTinChi: dataThongTinChung.tongTinChi || '',
        ngonNgu: dataThongTinChung.ngonNgu || '',
        website: dataThongTinChung.website || '',
        thoiGianDaoTao: dataThongTinChung.thoiGianDaoTao || '',
        banHanh: dataThongTinChung.banHanh || '',
      });
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu chi tiết!');
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchData();
  }, [id, isOpen]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateThongTinChung(id, formData);
      const data = response.data;

      if (response.statusCode === 200) {
        toast.success('Cập nhật chương trình thành công!');
        setIsEditing(false);
      } else {
        toast.error('Đã xảy ra lỗi khi cập nhật!');
        console.error('Lỗi:', data);
      }
    } catch (error) {
      toast.error('Lỗi hệ thống khi gửi form!');
      console.error('Lỗi gửi form:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={() => {
            onClose();
            setIsEditing(false);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          title="Đóng"
        >
          ✕
        </button>

        <h1 className="text-xl font-bold mb-6 text-center">Chi tiết chương trình đào tạo</h1>

        <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
          {/* NGÀNH */}
          <div className="w-80 mb-3">
            <label className="label-text">Ngành</label>
            <select
              className="select w-full"
              name="nganhId"
              value={formData.nganhId}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="">-- Chọn ngành --</option>
              {industries.map(industry => (
                <option key={industry.id} value={industry.id}>
                  ({industry.maNganh}) - {industry.tenNganh}
                </option>
              ))}
            </select>
          </div>

          {/* Text inputs */}
          {[
            ['Khoa quản lý', 'khoaQuanLy'],
            ['Hệ đào tạo', 'loaiHinhDaoTao'],
            ['Trình độ', 'loaiBang'],
          ].map(([label, key]) => (
            <div key={key} className="w-80 mb-3">
              <label className="label-text">{label}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="input w-full"
                disabled={!isEditing}
              />
            </div>
          ))}

          {/* Number inputs */}
          {[
            ['Tổng tín chỉ', 'tongTinChi'],
            ['Thời gian đào tạo', 'thoiGianDaoTao'],
          ].map(([label, key]) => (
            <div key={key} className="w-80 mb-3">
              <label className="label-text">{label}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="input w-full"
                disabled={!isEditing}
              />
            </div>
          ))}

          {/* Website + Ngôn ngữ */}
          {[
            ['Website', 'website'],
            ['Ngôn ngữ', 'ngonNgu'],
          ].map(([label, key]) => (
            <div key={key} className="w-80 mb-3">
              <label className="label-text">{label}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="input w-full"
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>

        {/* Ban hành */}
        <div className="w-full mb-6">
          <label className="label-text">Ban hành</label>
          <textarea
            name="banHanh"
            className="textarea w-full"
            rows="4"
            value={formData.banHanh}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="VD: Thông tư ban hành"
          ></textarea>
        </div>

        {/* Action buttons */}
        <div className="grid place-items-center">
          {isEditing ? (
            <div className="flex gap-4">
              <button onClick={() => setIsEditing(false)} className="btn btn-outline">
                Hủy
              </button>
              <button onClick={handleSave} className="btn btn-success">
                Lưu
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              Cập nhật
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateCTDT;
