import { useEffect, React } from "react"
import { Outlet, useLocation } from "react-router"
import Header from "./Header"

import { initFlyonUI } from '../global';
import NavBar from "./Navbar";

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        initFlyonUI();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (
                window.HSStaticMethods &&
                typeof window.HSStaticMethods.autoInit === 'function'
            ) {
                window.HSStaticMethods.autoInit();
            }
        }, 100);
    }, [location.pathname]);


    return (
        <>
            <Header />
            <NavBar />
            <div class="ml-68 mr-4 mt-4 max-sm:ml-10 ">
                <Outlet />
            </div>

        </>
    )
}