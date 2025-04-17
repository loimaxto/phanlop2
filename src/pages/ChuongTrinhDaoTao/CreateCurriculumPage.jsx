import React, { useState } from 'react'; // Import useState

export default function CreateCurriculumPage() {

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
    /*
       <td >Mã CTDT</td>
                                <td >Ngành</td>
                                <td >Khoa quản lý</td>
                                <td >Hệ đào tạo</td>
                                <td >Trình độ</td>
                                <td >Tính chỉ</td>
                                <td >Thời gian</td>
                                <td >Năm ban hành</td>
    */
    return (
        <div>
            <h1 className="modal-header font-bold">Tạo chương trình đào tạo</h1>

            <div className='w-full flex flex-row justify-center   self-center gap-6 mb-10'>
                <div>
                    <div class="w-96">
                        <label class="label-text" for="favorite-simpson">Chọn ngành</label>
                        <select class="select" id="favorite-simpson">
                            <option>Business</option>
                            <option>Cntt</option>

                        </select>
                    </div>
                    <div class="w-96">
                        <label class="label-text" for="favorite-simpson">Khoa quản lý</label>
                        <select class="select" id="favorite-simpson">
                            <option>Tài chính - kế toán</option>
                            <option>Cơ khí</option>

                        </select>
                    </div>
                    <div class="w-96">
                        <label class="label-text" for="favorite-simpson">Hệ đào tạo</label>
                        <select class="select" id="favorite-simpson">
                            <option>Chính quy</option>
                            <option>Từ xa</option>

                        </select>
                    </div>
                    <div class="w-96">
                        <label class="label-text" for="favorite-simpson">Trình độ</label>
                        <select class="select" id="favorite-simpson">
                            <option>Cử nhân</option>
                            <option> Thạc sĩ </option>

                        </select>
                    </div>
                </div>
                <div>
                    <div class="w-96">
                        <label class="label-text" for="favorite-simpson">Tổng tín chỉ</label>
                        <input className="input" type="number" name="" id="" />
                    </div>
                    <div class="w-96">
                        <label class="label-text" for="favorite-simpson">Thời gian đào tạo</label>
                        <input className="input" type="number" name="" id="" />
                    </div>
                    <div class="w-96">
                        <label class="label-text" for="favorite-simpson">Năm ban hành</label>
                        <input className="input" type="number" name="" id="" />
                    </div>
                </div>
            </div>
            <div className='mb-10 '>
                <div id="content-de-cuong " className="mb-4 max-w-md ml-auto mr-auto ">
                    <div className=" grid grid-cols-[1fr_1fr_auto] gap-2 p-1 border border-gray-300 rounded-t-md"> {/* Added rounded-t-md */}
                        <div className="font-bold text-center">Mã học phần</div>
                        <div className="font-bold text-center">Học kì dạy</div>
                    </div>
                    {contentItems.map((item, index) => (
                        <div
                            key={item.id} // Add unique key for React list rendering
                            className={`content-item  grid grid-cols-[1fr_1fr_auto] gap-2 p-4 items-center border border-t-0 border-gray-300 ${index === contentItems.length - 1 ? 'rounded-b-md' : ''}`} // Add border, remove top border for subsequent items, add rounded-b-md for last item
                        >
                            <div><input type="text" placeholder="VD: Bài tập lớn" className="input w-full" /></div> {/* Added placeholder */}
                            <div><input type="number" min="0" max="100" placeholder="VD: 30" className="input w-full" /></div> {/* Added placeholder, max */}
                            <div className="w-min">
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
                <button
                    onClick={handleAddItem}
                    type="button" // Good practice to specify button type
                    className="btn btn-soft btn-gradient text-white "
                >
                    Thêm môn học
                </button>
            </div>

            <div className='grid place-items-center'>
                <button className='btn btn-success'>Xác nhận</button>
            </div>
        </div>
    )
}