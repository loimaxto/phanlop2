"use client";

import React from "react";
import { useState, useEffect } from "react";
import printService from "../../services/print-service";

const KeHoachDayHocPage = ({ ctdtName }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [modalMode, setModalMode] = useState("add"); // add, edit
    const [selectedGroup, setSelectedGroup] = useState("all");
    const [expandedGroups, setExpandedGroups] = useState({});
    const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);

    // Định nghĩa các nhóm môn học
    const courseGroups = [
        {
            id: "861",
            name: "I. Khối kiến thức giáo dục đại cương",
            color: "bg-blue-50",
        },
        { id: "866", name: "II. Ngoại ngữ", color: "bg-green-50" },
        { id: "865", name: "III. Pháp luật", color: "bg-yellow-50" },
        { id: "864", name: "IV. Toán học", color: "bg-purple-50" },
        { id: "other", name: "V. Khác", color: "bg-gray-50" },
    ];

    // Hàm xác định nhóm môn học dựa trên mã học phần
    const getCourseGroup = (maHP) => {
        const prefix = maHP.substring(0, 3);
        const group = courseGroups.find((g) => g.id === prefix);
        return group ? group.id : "other";
    };

    // Hàm lấy tên nhóm môn học
    const getGroupName = (groupId) => {
        const group = courseGroups.find((g) => g.id === groupId);
        return group ? group.name : "Khác";
    };

    // Hàm lấy màu nền cho nhóm
    const getGroupColor = (groupId) => {
        const group = courseGroups.find((g) => g.id === groupId);
        return group ? group.color : "bg-gray-50";
    };

    // Khởi tạo trạng thái mở rộng cho tất cả các nhóm
    useEffect(() => {
        const initialExpandedState = {};
        courseGroups.forEach((group) => {
            initialExpandedState[group.id] = true;
        });
        setExpandedGroups(initialExpandedState);
    }, []);

    // Dữ liệu mẫu cho kế hoạch dạy học
    const [keHoachData, setKeHoachData] = useState([
        {
            id: 1,
            tt: 1,
            maHP: "861301",
            tenHocPhan: "Triết học Mác – Lênin",
            soTinChi: 3,
            hocKy: [1],
            maHocPhanTruoc: "",
            nhomMonHoc: "861",
        },
        {
            id: 2,
            tt: 2,
            maHP: "861302",
            tenHocPhan: "Kinh tế chính trị Mác – Lênin",
            soTinChi: 2,
            hocKy: [2],
            maHocPhanTruoc: "861301",
            nhomMonHoc: "861",
        },
        {
            id: 3,
            tt: 3,
            maHP: "861303",
            tenHocPhan: "Chủ nghĩa xã hội khoa học",
            soTinChi: 2,
            hocKy: [3],
            maHocPhanTruoc: "861302",
            nhomMonHoc: "861",
        },
        {
            id: 4,
            tt: 4,
            maHP: "861304",
            tenHocPhan: "Tư tưởng Hồ Chí Minh",
            soTinChi: 2,
            hocKy: [5],
            maHocPhanTruoc: "861303",
            nhomMonHoc: "861",
        },
        {
            id: 5,
            tt: 5,
            maHP: "861305",
            tenHocPhan: "Lịch sử Đảng Cộng sản Việt Nam",
            soTinChi: 2,
            hocKy: [6],
            maHocPhanTruoc: "861303",
            nhomMonHoc: "861",
        },
        {
            id: 6,
            tt: 6,
            maHP: "866401",
            tenHocPhan: "Tiếng Anh 1",
            soTinChi: 3,
            hocKy: [1],
            maHocPhanTruoc: "",
            nhomMonHoc: "866",
        },
        {
            id: 7,
            tt: 7,
            maHP: "866402",
            tenHocPhan: "Tiếng Anh 2",
            soTinChi: 3,
            hocKy: [2],
            maHocPhanTruoc: "866401",
            nhomMonHoc: "866",
        },
        {
            id: 8,
            tt: 8,
            maHP: "866403",
            tenHocPhan: "Tiếng Anh 3",
            soTinChi: 3,
            hocKy: [3],
            maHocPhanTruoc: "866402",
            nhomMonHoc: "866",
        },
        {
            id: 9,
            tt: 9,
            maHP: "865006",
            tenHocPhan: "Pháp luật đại cương",
            soTinChi: 2,
            hocKy: [7],
            maHocPhanTruoc: "",
            nhomMonHoc: "865",
        },
        {
            id: 10,
            tt: 10,
            maHP: "864508",
            tenHocPhan: "Xác suất thống kê",
            soTinChi: 3,
            hocKy: [1],
            maHocPhanTruoc: "",
            nhomMonHoc: "864",
        },
        {
            id: 11,
            tt: 11,
            maHP: "864005",
            tenHocPhan: "Giải tích 1",
            soTinChi: 3,
            hocKy: [1],
            maHocPhanTruoc: "",
            nhomMonHoc: "864",
        },
    ]);

    // Lọc dữ liệu theo từ khóa tìm kiếm và nhóm môn học
    const filteredData = keHoachData.filter((item) => {
        const matchesSearch =
            item.maHP.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tenHocPhan.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedGroup === "all") {
            return matchesSearch;
        } else {
            return matchesSearch && item.nhomMonHoc === selectedGroup;
        }
    });

    // Nhóm dữ liệu theo nhóm môn học
    const groupedData = {};
    courseGroups.forEach((group) => {
        groupedData[group.id] = filteredData.filter(
            (item) => item.nhomMonHoc === group.id
        );
    });

    // Tính tổng số tín chỉ cho mỗi nhóm
    const groupCredits = {};
    courseGroups.forEach((group) => {
        groupCredits[group.id] = groupedData[group.id].reduce(
            (sum, item) => sum + item.soTinChi,
            0
        );
    });

    // Xử lý thêm mới
    const handleAdd = () => {
        setModalMode("add");
        setCurrentItem({
            id: keHoachData.length + 1,
            tt: keHoachData.length + 1,
            maHP: "",
            tenHocPhan: "",
            soTinChi: 0,
            hocKy: [],
            maHocPhanTruoc: "",
            nhomMonHoc: "861", // Mặc định
        });
        setIsModalOpen(true);
    };

    // Xử lý chỉnh sửa
    const handleEdit = (item) => {
        setModalMode("edit");
        setCurrentItem({ ...item });
        setIsModalOpen(true);
    };

    // Xử lý xóa
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa học phần này?")) {
            setKeHoachData(keHoachData.filter((item) => item.id !== id));
        }
    };

    // Xử lý lưu
    const handleSave = () => {
        // Tự động xác định nhóm môn học dựa trên mã học phần nếu chưa có
        const updatedItem = {
            ...currentItem,
            nhomMonHoc:
                currentItem.nhomMonHoc || getCourseGroup(currentItem.maHP),
        };

        if (modalMode === "add") {
            setKeHoachData([...keHoachData, updatedItem]);
        } else {
            setKeHoachData(
                keHoachData.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                )
            );
        }
        setIsModalOpen(false);
    };

    // Xử lý thay đổi trường dữ liệu
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Nếu thay đổi mã học phần, tự động cập nhật nhóm môn học
        if (name === "maHP" && value.length >= 3) {
            setCurrentItem({
                ...currentItem,
                [name]: value,
                nhomMonHoc: getCourseGroup(value),
            });
        } else {
            setCurrentItem({
                ...currentItem,
                [name]: value,
            });
        }
    };

    // Xử lý thay đổi học kỳ (checkbox)
    const handleHocKyChange = (hocKy) => {
        const hocKyArray = [...currentItem.hocKy];

        if (hocKyArray.includes(hocKy)) {
            // Nếu đã có, loại bỏ
            const index = hocKyArray.indexOf(hocKy);
            hocKyArray.splice(index, 1);
        } else {
            // Nếu chưa có, thêm vào
            hocKyArray.push(hocKy);
        }

        setCurrentItem({
            ...currentItem,
            hocKy: hocKyArray.sort((a, b) => a - b),
        });
    };

    // Xử lý thay đổi nhóm môn học trong form
    const handleGroupChange = (e) => {
        setCurrentItem({
            ...currentItem,
            nhomMonHoc: e.target.value,
        });
    };

    // Xử lý mở rộng/thu gọn nhóm
    const toggleGroup = (groupId) => {
        setExpandedGroups({
            ...expandedGroups,
            [groupId]: !expandedGroups[groupId],
        });
    };

    // Xử lý in kế hoạch dạy học
    const handlePrint = () => {
        printService.printKeHoachDayHoc(
            ctdtName,
            keHoachData,
            courseGroups,
            selectedGroup,
            searchTerm
        );
        setIsPrintMenuOpen(false);
    };

    // Xử lý in kế hoạch dạy học theo nhóm
    const handlePrintByGroup = (group) => {
        printService.printKeHoachDayHocByGroup(
            ctdtName,
            keHoachData,
            group,
            searchTerm
        );
        setIsPrintMenuOpen(false);
    };

    // Xử lý in phân bố tín chỉ
    const handlePrintDistribution = () => {
        printService.printCreditDistribution(
            ctdtName,
            keHoachData,
            courseGroups
        );
        setIsPrintMenuOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Kế hoạch dạy học</h1>
                        <p className="text-gray-600">
                            Ngành: {ctdtName ? ctdtName : "Công nghệ thông tin"}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm học phần..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <svg
                                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsPrintMenuOpen(!isPrintMenuOpen)
                                }
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                In
                            </button>
                            {isPrintMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                    >
                                        <button
                                            onClick={handlePrint}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            In tất cả
                                        </button>
                                        <button
                                            onClick={handlePrintDistribution}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            In phân bố tín chỉ
                                        </button>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        {courseGroups.map((group) => (
                                            <button
                                                key={group.id}
                                                onClick={() =>
                                                    handlePrintByGroup(group)
                                                }
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                In nhóm{" "}
                                                {group.name.split(".")[0]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleAdd}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Thêm
                        </button>
                    </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                            Lọc theo nhóm:
                        </span>
                        <select
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tất cả nhóm</option>
                            {courseGroups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border">TT</th>
                                <th className="p-3 border">Mã HP</th>
                                <th className="p-3 border">Tên Học phần</th>
                                <th className="p-3 border">Số tín chỉ</th>
                                <th
                                    className="p-3 border text-center"
                                    colSpan="12"
                                >
                                    Học kỳ thực hiện
                                </th>
                                <th className="p-3 border">
                                    Mã học phần trước
                                </th>
                                <th className="p-3 border">Thao tác</th>
                            </tr>
                            <tr className="bg-gray-100">
                                <th className="p-3 border" colSpan="4"></th>
                                {[...Array(12)].map((_, i) => (
                                    <th
                                        key={i}
                                        className="p-2 border w-8 text-center"
                                    >
                                        {i + 1}
                                    </th>
                                ))}
                                <th className="p-3 border" colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseGroups.map((group) => {
                                const groupItems = groupedData[group.id] || [];
                                if (
                                    groupItems.length === 0 &&
                                    selectedGroup !== "all"
                                )
                                    return null;

                                return (
                                    <React.Fragment key={group.id}>
                                        {/* Tiêu đề nhóm */}
                                        <tr className={`${group.color} border`}>
                                            <td
                                                colSpan="17"
                                                className="p-3 font-medium cursor-pointer"
                                                onClick={() =>
                                                    toggleGroup(group.id)
                                                }
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        {group.name} (
                                                        {groupItems.length} học
                                                        phần -{" "}
                                                        {groupCredits[group.id]}{" "}
                                                        tín chỉ)
                                                    </div>
                                                    <div>
                                                        {expandedGroups[
                                                            group.id
                                                        ] ? (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Các học phần trong nhóm */}
                                        {expandedGroups[group.id] &&
                                            groupItems.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="p-3 border">
                                                        {index + 1}
                                                    </td>
                                                    <td className="p-3 border">
                                                        {item.maHP}
                                                    </td>
                                                    <td className="p-3 border">
                                                        {item.tenHocPhan}
                                                    </td>
                                                    <td className="p-3 border text-center">
                                                        {item.soTinChi}
                                                    </td>
                                                    {[...Array(12)].map(
                                                        (_, i) => (
                                                            <td
                                                                key={i}
                                                                className="p-2 border text-center"
                                                            >
                                                                {item.hocKy.includes(
                                                                    i + 1
                                                                ) ? (
                                                                    <span className="inline-block w-4 h-4 bg-blue-500 rounded-sm text-white text-xs flex items-center justify-center">
                                                                        x
                                                                    </span>
                                                                ) : null}
                                                            </td>
                                                        )
                                                    )}
                                                    <td className="p-3 border">
                                                        {item.maHocPhanTruoc}
                                                    </td>
                                                    <td className="p-3 border">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        item
                                                                    )
                                                                }
                                                                className="text-blue-500 hover:text-blue-700"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                        {/* Hiển thị thông báo nếu không có học phần nào trong nhóm */}
                                        {expandedGroups[group.id] &&
                                            groupItems.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan="17"
                                                        className="p-3 border text-center text-gray-500"
                                                    >
                                                        Không có học phần nào
                                                        trong nhóm này
                                                    </td>
                                                </tr>
                                            )}

                                        {/* Dòng tổng kết cho nhóm */}
                                        {expandedGroups[group.id] &&
                                            groupItems.length > 0 && (
                                                <tr
                                                    className={`${group.color} border-t-2 border-gray-300`}
                                                >
                                                    <td
                                                        colSpan="3"
                                                        className="p-2 border text-right font-medium"
                                                    >
                                                        Tổng số tín chỉ nhóm{" "}
                                                        {
                                                            group.name.split(
                                                                "."
                                                            )[0]
                                                        }
                                                        :
                                                    </td>
                                                    <td className="p-2 border text-center font-medium">
                                                        {groupCredits[group.id]}
                                                    </td>
                                                    <td
                                                        colSpan="13"
                                                        className="p-2 border"
                                                    ></td>
                                                </tr>
                                            )}
                                    </React.Fragment>
                                );
                            })}

                            {/* Hiển thị thông báo nếu không có kết quả tìm kiếm */}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="17"
                                        className="p-3 border text-center text-gray-500"
                                    >
                                        Không tìm thấy học phần nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 font-medium">
                                <td
                                    colSpan="3"
                                    className="p-3 border text-right"
                                >
                                    Tổng số tín chỉ:
                                </td>
                                <td className="p-3 border text-center">
                                    {filteredData.reduce(
                                        (sum, item) => sum + item.soTinChi,
                                        0
                                    )}
                                </td>
                                <td colSpan="13" className="p-3 border"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Modal thêm/sửa học phần */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-[#00000094] flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">
                            {modalMode === "add"
                                ? "Thêm học phần mới"
                                : "Chỉnh sửa học phần"}
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Mã học phần
                                </label>
                                <input
                                    type="text"
                                    name="maHP"
                                    value={currentItem?.maHP || ""}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Số tín chỉ
                                </label>
                                <input
                                    type="number"
                                    name="soTinChi"
                                    value={currentItem?.soTinChi || 0}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Tên học phần
                                </label>
                                <input
                                    type="text"
                                    name="tenHocPhan"
                                    value={currentItem?.tenHocPhan || ""}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Mã học phần trước
                                </label>
                                <input
                                    type="text"
                                    name="maHocPhanTruoc"
                                    value={currentItem?.maHocPhanTruoc || ""}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nhóm môn học
                                </label>
                                <select
                                    name="nhomMonHoc"
                                    value={currentItem?.nhomMonHoc || ""}
                                    onChange={handleGroupChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {courseGroups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Học kỳ thực hiện
                            </label>
                            <div className="grid grid-cols-6 gap-2">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`hocky-${i + 1}`}
                                            checked={
                                                currentItem?.hocKy.includes(
                                                    i + 1
                                                ) || false
                                            }
                                            onChange={() =>
                                                handleHocKyChange(i + 1)
                                            }
                                            className="mr-2"
                                        />
                                        <label htmlFor={`hocky-${i + 1}`}>
                                            Học kỳ {i + 1}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeHoachDayHocPage;
