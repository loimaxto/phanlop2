import React from 'react';
import { NavLink } from 'react-router';
import { MdAssignment, MdCastForEducation } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { ImBooks } from 'react-icons/im';
import { BsClipboardDataFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

export default function NavBar() {
  return (
    <aside
      id="with-navbar-sidebar"
      className="border-r-2 border-gray-500  overlay sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64 sm:absolute sm:z-0 sm:flex sm:translate-x-0 pt-16"
      role="dialog"
      tabIndex="-1"
    >
      <div className="drawer-body  p-0 pt-4 ">
        <ul className="menu">
          <li>
            <NavLink to="/ctdt" className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}>
              <MdCastForEducation />
              Chương trình đào tạo
            </NavLink>
          </li>
          <li>
            <NavLink to="/hoc-phan" className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}>
              <ImBooks />
              Học phần
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/de-cuong-chi-tiet"
              className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}
            >
              <BsClipboardDataFill />
              Đề cương chi tiết
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ke-hoach-mo-nhom"
              className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}
            >
              <MdAssignment />
              Kế hoạch mở nhóm
            </NavLink>
          </li>
          <li>
            <NavLink to="/giang-vien" className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}>
              <GiTeacher />
              Giảng viên
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}>
              <FaUser />
              Người dùng
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
