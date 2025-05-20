import React, { useState, useEffect } from 'react';
import DeCuongChiTietService from '@services/DeCuongChiTietService.js';

export default function DetailDeCuongModal({ isOpen, onClose, hocPhanObject }) {
    const [contentItems, setContentItems] = useState([]);
    const [maHocPhan, setMaHocPhan] = useState('');

    const loadDeCuongData = async () => {
        try {
            if (!hocPhanObject?.id) {
                console.log("hoc phan object rỗng");
                return;
            }
            const response = await DeCuongChiTietService.getDeCuongByHocPhanId(hocPhanObject.id);
            console.log("aaa", response);
            const data = response || [];
            if (data.length > 0) {
                setContentItems(data.map(item => ({
                    id: item.id,
                    ten: item.tenCotDiem,
                    trongSo: item.trongSo,
                    hinhThuc: item.hinhThuc,
                })));
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu đề cương:', error);
        }
    };

    useEffect(() => {
        if (isOpen && hocPhanObject) {
            loadDeCuongData();
            setMaHocPhan(hocPhanObject.maHocPhan);
        } else if (isOpen) {
            setContentItems([]);
            setMaHocPhan('');
        }
    }, [hocPhanObject, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="overlay bg-blend-screen modal opacity-100 duration-300">
            <div className="modal-dialog opacity-100 duration-300 modal-dialog-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Xem đề cương chi tiết</h3>
                        <button onClick={onClose} type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3">
                            <span className="icon-[tabler--x] size-4"></span>
                        </button>
                    </div>
                    <div className="modal-body ">
                        <div className="w-full mb-4">
                            <label className="label-text" htmlFor="input-ma-hp">Mã học phần</label>
                            <input
                                type="text"
                                className="input w-full"
                                id="input-ma-hp"
                                value={maHocPhan}
                                readOnly
                            />
                        </div>

                        <h3 className="mt-5">Nội dung</h3>

                        <div id="content-de-cuong" className="mb-4">
                            <div className="w-full grid grid-cols-[3fr_1fr_2fr] gap-2 p-4 border border-gray-300 rounded-t-md">
                                <div className="font-bold text-center">Bộ phận đánh giá</div>
                                <div className="font-bold text-center">Trọng số (%)</div>
                                <div className="font-bold text-center">Hình thức</div>
                            </div>

                            {contentItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`content-item w-full grid grid-cols-[3fr_1fr_2fr] gap-2 p-4 items-center border border-t-0 border-gray-300 ${contentItems.indexOf(item) === contentItems.length - 1 ? 'rounded-b-md' : ''}`}
                                >
                                    <div>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            value={item.ten}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            className="input w-full text-center"
                                            value={item.trongSo}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            value={item.hinhThuc}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} type="button" className="btn btn-soft btn-secondary">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
