import React, { useState, useEffect } from 'react'; // Import useState
import DeCuongChiTietService from '@services/DeCuongChiTietService.js'
export default function CreateDeCuongModal({ isOpen, onClose }) {
    const [contentItems, setContentItems] = useState([
        { id: Date.now(), ten: '', trongSo: '', hinhThuc: '' }
    ]);
    const [maHocPhan, setMaHocPhan] = useState('');
    useEffect(() => {
        setContentItems([
            { id: Date.now(), ten: '', trongSo: '', hinhThuc: '' }
        ])
        setMaHocPhan('')
    }, [isOpen])
    const handleMaHocPhanChange = (event) => {
        setMaHocPhan(event.target.value);
    };

    const handleAddItem = () => {
        setContentItems(prevItems => [
            ...prevItems,
            { id: Date.now(), ten: '', trongSo: '', hinhThuc: '' }
        ]);
    };

    const handleRemoveItem = (idToRemove) => {
        setContentItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
    };

    const handleInputChange = (itemId, event) => {
        const { name, value } = event.target;
        setContentItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, [name]: value } : item
            )
        );
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!maHocPhan.trim()) {
            newErrors.maHocPhan = 'Vui lòng nhập mã học phần.';
            isValid = false;
        }

        contentItems.forEach((item, index) => {
            const itemErrors = {};
            if (!item.ten.trim()) {
                itemErrors[`ten-${index}`] = 'Vui lòng nhập bộ phận đánh giá.';
                isValid = false;
            }
            if (!item.trongSo.trim()) {
                itemErrors[`trongSo-${index}`] = 'Vui lòng nhập trọng số.';
                isValid = false;
            } else if (isNaN(parseInt(item.trongSo, 10)) || parseInt(item.trongSo, 10) < 0 || parseInt(item.trongSo, 10) > 100) {
                itemErrors[`trongSo-${index}`] = 'Trọng số phải là số từ 0 đến 100.';
                isValid = false;
            }
            if (!item.hinhThuc.trim()) {
                itemErrors[`hinhThuc-${index}`] = 'Vui lòng nhập hình thức.';
                isValid = false;
            }
            Object.assign(newErrors, itemErrors);
        });
        return isValid;
    };
    const handleSubmit =async () => {
        if (validate()) {
            const dataToSubmit = contentItems.map(item => ({
                "hocPhan": { "maHocPhan": maHocPhan },
                "tenCotDiem": item.ten,
                "trongSo": parseInt(item.trongSo, 10) || 0,
                "hinhThuc": item.hinhThuc,
            }));
            console.log('Dữ liệu submit (JSON):', JSON.stringify(dataToSubmit, null, 2));
           await DeCuongChiTietService.create(dataToSubmit)

            onClose(); // Đóng modal sau khi submit (hoặc xử lý xong)
        } else {
            console.log('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="overlay bg-blend-screen modal opacity-100 duration-300" >
            <div className="modal-dialog opacity-100 duration-300 modal-dialog-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Tạo đề cương chi tiết</h3>
                        <button onClick={onClose} type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" >
                            <span className="icon-[tabler--x] size-4"></span>
                        </button>
                    </div>
                    <div className="modal-body ">
                        <div className="w-full mb-4">
                            <label className="label-text" htmlFor="input-ma-hp">Mã học phần</label>
                            <input
                                type="text"
                                placeholder="Nhập mã học phần"
                                className="input w-full"
                                id="input-ma-hp"
                                value={maHocPhan}
                                onChange={handleMaHocPhanChange}
                            />
                        </div>

                        <h3 className="mt-5">Nội dung</h3>

                        <div id="content-de-cuong" className="mb-4">

                            <div className="w-full grid grid-cols-[3fr_1fr_2fr_auto] gap-2 p-4 border border-gray-300 rounded-t-md">
                                <div className="font-bold text-center">Bộ phận đánh giá</div>
                                <div className="font-bold text-center">Trọng số (%)</div>
                                <div className="font-bold text-center">Hình thức</div>
                                <div></div>
                            </div>

                            {contentItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`content-item w-full grid grid-cols-[3fr_1fr_2fr_auto] gap-2 p-4 items-center border border-t-0 border-gray-300 ${index === contentItems.length - 1 ? 'rounded-b-md' : ''}`}
                                >
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="VD: Bài tập lớn"
                                            className="input w-full"
                                            name="ten"
                                            value={item.ten}
                                            onChange={(event) => handleInputChange(item.id, event)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder="VD: 30"
                                            className="input w-full"
                                            name="trongSo"
                                            value={item.trongSo}
                                            onChange={(event) => handleInputChange(item.id, event)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="VD: Vấn đáp"
                                            className="input w-full"
                                            name="hinhThuc"
                                            value={item.hinhThuc}
                                            onChange={(event) => handleInputChange(item.id, event)}
                                        />
                                    </div>
                                    <div className="w-fit">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                            disabled={contentItems.length <= 1}
                                            title="Xóa nội dung"
                                        >
                                            <span className="icon-[tabler--trash] size-5"></span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleAddItem}
                            type="button"
                            className="btn btn-soft btn-gradient text-white"
                        >
                            Thêm nội dung
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} type="button" className="btn btn-soft btn-secondary">Hủy</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    )
}