import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getListAll } from '@services/NganhService';
import { createThongTinChung } from '@services/ThongTinChungService';

export default function CreateCurriculumModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nganhId: '',
    khoaQuanLy: '',
    loaiHinhDaoTao: '',
    loaiBang: '',
    tongTinChi: '',
    thoiGianDaoTao: '',
    banHanh: '',
    website: '',
    ngonNgu: '',
  });

  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const response = await getListAll();
      setIndustries(response.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách ngành.');
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await createThongTinChung(formDataToSend);
      const data = response.data;

      if (response.statusCode === 201) {
        toast.success('Tạo chương trình đào tạo thành công!');
        onClose();
      } else {
        toast.error('Đã xảy ra lỗi khi tạo chương trình.');
      }
    } catch (error) {
      console.error('Lỗi gửi form:', error);
      toast.error('Lỗi hệ thống! Vui lòng thử lại.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          title="Đóng"
        >
          <span className="icon-[tabler--x] size-6"></span>
        </button>

        <h1 className="text-xl font-bold mb-6 text-center">Tạo chương trình đào tạo</h1>

        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-wrap justify-center gap-6 mb-10">
            {/* NGÀNH */}
            <div className="w-80 mb-3">
              <label className="label-text">Ngành</label>
              <select
                className="select w-full"
                name="nganhId"
                value={formData.nganhId}
                onChange={handleInputChange}
              >
                <option value="">-- Chọn ngành --</option>
                {industries.map(industry => (
                  <option key={industry.id} value={industry.id}>
                    ({industry.maNganh}) - {industry.tenNganh}
                  </option>
                ))}
              </select>
            </div>

            {/* Khoa, Hệ, Trình độ */}
            {[
              { label: 'Khoa quản lý', key: 'khoaQuanLy' },
              { label: 'Hệ đào tạo', key: 'loaiHinhDaoTao' },
              { label: 'Trình độ', key: 'loaiBang' },
            ].map(({ label, key }) => (
              <div key={key} className="w-80 mb-3">
                <label className="label-text">{label}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="input w-full"
                />
              </div>
            ))}

            {/* Tổng tín chỉ & thời gian đào tạo */}
            {[
              { label: 'Tổng tín chỉ', key: 'tongTinChi' },
              { label: 'Thời gian đào tạo', key: 'thoiGianDaoTao' },
            ].map(({ label, key }) => (
              <div key={key} className="w-80 mb-3">
                <label className="label-text">{label}</label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="input w-full"
                />
              </div>
            ))}

            {/* Website & Ngôn ngữ */}
            {[
              {
                label: 'Website',
                key: 'website',
                type: 'text',
                placeholder: 'https://ten-truong.edu.vn',
              },
              {
                label: 'Ngôn ngữ',
                key: 'ngonNgu',
                type: 'text',
                placeholder: 'Ví dụ: Tiếng Việt, English',
              },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="w-80 mb-3">
                <label className="label-text">{label}</label>
                <input
                  type={type}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="input w-full"
                  placeholder={placeholder}
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
              placeholder="VD: Thông tư ban hành"
            ></textarea>
          </div>

          <div className="grid place-items-center">
            <button type="submit" className="btn btn-success">
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
