import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  // Filter users based on keyword
  // const filteredUsers = users.filter(user =>
  //   [user.email || '', user.username || '', user.role || '', user.soDienThoai || ''].some(field =>
  //     field.toLowerCase().includes(searchKeyword.toLowerCase())
  //   )
  // );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      {/* <div className="flex justify-start items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo email, tên, vai trò, SĐT..."
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-200">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-200">
                Tên đăng nhập
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-200">
                Vai trò
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-200">
                SĐT
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-200">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-200">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {u.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {u.username}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {u.role}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {u.soDienThoai}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      u.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {u.status ? 'Hoạt động' : 'Khoá'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm border-b border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(u)}
                      className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      title="Sửa người dùng"
                    >
                      <FaEdit className="h-4 w-4 mr-1" />
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(u.id)}
                      className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                      title="Xóa người dùng"
                    >
                      <FaRegTrashAlt className="h-4 w-4 mr-1" />
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-3 text-center text-sm text-gray-500 border-b border-gray-200"
                >
                  Không tìm thấy người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
