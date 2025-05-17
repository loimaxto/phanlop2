import React from 'react';
import { NavLink } from 'react-router';
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
              <span className="icon-[tabler--home] size-5"></span>
              Chương trình đào tạo
            </NavLink>
          </li>
          <li>
            <NavLink to="/hoc-phan" className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}>
              <span className="icon-[tabler--home] size-5"></span>
              Học phần
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/de-cuong-chi-tiet"
              className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}
            >
              <span className="icon-[tabler--home] size-5"></span>
              Đề cương chi tiết
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ke-hoach-mo-nhom"
              className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}
            >
              <span className="icon-[tabler--home] size-5"></span>
              Kế hoạch mở nhóm
            </NavLink>
          </li>
          <li>
            <NavLink to="/giang-vien" className={({ isActive }) => (isActive ? 'bg-blue-200' : '')}>
              <span className="icon-[tabler--home] size-5"></span>
              Giảng viên
            </NavLink>
          </li>
          <li>
            <a href="#">
              <span className="icon-[tabler--user] size-5"></span>
              User
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-[tabler--login] size-5"></span>
              Sign In
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-[tabler--logout-2] size-5"></span>
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
