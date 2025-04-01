import { useEffect, React } from "react"
import { Outlet, useLocation } from "react-router"
import Header from "./Header"

import { initFlyonUI } from '../global';

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
            <h1 class="text-3xl font-bold underline">
                Hello world!
            </h1>
            <Header />
            <Outlet />
        </>
    )
}