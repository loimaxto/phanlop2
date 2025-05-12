import React, { useState } from 'react'; // Import useState

export default function CreateDeCuongModal({ isOpen, onClose }) {
    // State to hold the list of content items
    // Initialize with one default item
    const [contentItems, setContentItems] = useState([
        { id: Date.now() } // Use a unique ID, timestamp is simple here
    ]);

    // Function to add a new content item
    const handleAddItem = () => {
        setContentItems(prevItems => [
            ...prevItems,
            { id: Date.now() } // Add a new item with a unique ID
        ]);
    };

    // Function to remove a content item by its ID
    const handleRemoveItem = (idToRemove) => {
        setContentItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
    };


    if (!isOpen) return null;

    return (
        <div className="overlay bg-blend-screen modal opacity-100 duration-300" >
            <div className="modal-dialog opacity-100 duration-300 modal-dialog-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Tạo đề cương chi tiết</h3>
                        <button onClick={onClose} type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3"  >
                            <span className="icon-[tabler--x] size-4"></span>
                        </button>
                    </div>
                    <div className="modal-body ">
                        <div className="w-full mb-4"> {/* Added margin-bottom for spacing */}
                            <label className="label-text" htmlFor="input-ten-hp">Mã học phần</label> {/* Use htmlFor instead of for */}
                            <input type="text" placeholder="Nhập mã học phần" className="input" id="input-ten-hp" /> {/* Changed placeholder */}
                        </div>

                        <h3 className="mt-5">Nội dung</h3>
                        {/* Container for dynamic content items */}
                        <div id="content-de-cuong" className="mb-4"> {/* Use className, added margin-bottom */}
                            {/* Header Row - static */}
                            <div className="w-full grid grid-cols-[3fr_1fr_2fr_auto] gap-2 p-4 border border-gray-300 rounded-t-md"> {/* Added rounded-t-md */}
                                <div className="font-bold text-center">Bộ phận đánh giá</div>
                                <div className="font-bold text-center">Trọng số (%)</div> {/* Added (%) */}
                                <div className="font-bold text-center">Hình thức</div>
                                <div></div> {/* Placeholder for delete button column */}
                            </div>
                            {/* Dynamic Content Item Rows - Mapped from state */}
                            {contentItems.map((item, index) => (
                                <div
                                    key={item.id} // Add unique key for React list rendering
                                    className={`content-item w-full grid grid-cols-[3fr_1fr_2fr_auto] gap-2 p-4 items-center border border-t-0 border-gray-300 ${index === contentItems.length - 1 ? 'rounded-b-md' : ''}`} // Add border, remove top border for subsequent items, add rounded-b-md for last item
                                >
                                    <div><input type="text" placeholder="VD: Bài tập lớn" className="input w-full" /></div> {/* Added placeholder */}
                                    <div><input type="number" min="0" max="100" placeholder="VD: 30" className="input w-full" /></div> {/* Added placeholder, max */}
                                    <div><input type="text" placeholder="VD: Vấn đáp" className="input w-full" /></div> {/* Added placeholder */}
                                    <div className="w-fit">
                                        {/* Add onClick handler to the remove button */}
                                        <button
                                            type="button" // Good practice to specify button type
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-700 disabled:opacity-50" // Added styling and disabled state
                                            disabled={contentItems.length <= 1} // Disable removing if only one item left
                                            title="Xóa nội dung" // Added title for accessibility
                                        >
                                            <span className="icon-[tabler--trash] size-5"></span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Button to add new items */}
                        <button
                            onClick={handleAddItem}
                            type="button" // Good practice to specify button type
                            className="btn btn-soft btn-gradient text-white"
                        >
                            Thêm nội dung
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} type="button" className="btn btn-soft btn-secondary">Hủy</button>
                        <button type="button" className="btn btn-primary">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    )
}