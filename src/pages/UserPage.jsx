import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';
import {
  getAllUsers,
  findUsersByKeyword,
  createUser,
  updateUser,
  deleteUser,
} from '@services/userService';
import UserTable from '@components/UserTable';
import UserFormModal from '@components/UserFormModal';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchUsers = async searchKeyword => {
    setIsLoading(true);
    try {
      const response = await findUsersByKeyword(searchKeyword);
      if (response.success) {
        setUsers(response.data);
      } else {
        toast.error('Không thể tải danh sách người dùng');
      }
    } catch (error) {
      toast.error('Lỗi hệ thống khi lấy danh sách người dùng');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchKeyword);
  }, [searchKeyword]);

  const handleCreate = async user => {
    const response = await createUser(user);
    if (response.success) {
      setUsers([...users, response.data]);
      setModalOpen(false);
    }
  };

  const handleUpdate = async (id, user) => {
    const response = await updateUser(id, user);
    if (response.success) {
      setUsers(users.map(u => (u.id === id ? { ...u, ...user } : u)));
      setModalOpen(false);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      const response = await deleteUser(id);
      if (response.success) {
        setUsers(users.filter(u => u.id !== id));
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={() => {
              setSelectedUser(null);
              setModalOpen(true);
            }}
          >
            <FaPlus className="h-5 w-5 mr-2" />
            Thêm người dùng
          </button>
        </div>
        {/* Search Input */}
        <div className="flex justify-start items-center mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo email, tên, vai trò, SĐT..."
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        {isLoading ? (
          <div className="text-center py-4">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <UserTable
            users={users}
            onEdit={user => {
              setSelectedUser(user);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        )}

        {modalOpen && (
          <UserFormModal
            user={selectedUser}
            onClose={() => setModalOpen(false)}
            onSave={data => {
              selectedUser ? handleUpdate(selectedUser.id, data) : handleCreate(data);
            }}
            isOpen={modalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
