import { useEffect, React } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header';

import { initFlyonUI } from '../global';
import NavBar from './Navbar';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    initFlyonUI();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, [location.pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>
      <NavBar />
      <div className="ml-68 mr-4 mt-4 max-sm:ml-10 pt-16">
        <Outlet />
      </div>
      <>
        {/* ToastContainer */}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </>
  );
}
