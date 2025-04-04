import React from "react";
import { NavLink } from "react-router";
export default function NavBar() {
    return (
        <aside id="with-navbar-sidebar" className="border-r-2 border-gray-500  overlay sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64 sm:absolute sm:z-0 sm:flex sm:translate-x-0 pt-16" role="dialog" tabindex="-1" >
            <div className="drawer-body  p-0 pt-4 ">
                <ul className="menu">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            <span className="icon-[tabler--home] size-5"></span>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            <span className="icon-[tabler--home] size-5"></span>
                            About
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
    )
}