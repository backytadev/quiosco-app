"use client";

import { useState, useEffect } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import ThemeToggle from "@/components/themes/ThemeToggle";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ToastNotification from "@/components/ui/ToastNotification";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header (blocks interaction when the sidebar is open) */}
      <div
        className={`fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 
      backdrop-blur-md shadow-md md:shadow-none border-b md:border-none border-gray-200 dark:border-gray-800 
      ${isSidebarOpen ? "pointer-events-none" : ""}`}
      >
        <div className="flex justify-end items-center pt-3 px-4 py-3 bg-white lg:bg-slate-50 shadow-md lg:shadow-none dark:shadow-slate-700 dark:bg-slate-800 lg:dark:bg-slate-900">
          <div className="flex items-center gap-3">
            {/* Button to open the menu on mobile */}
            <button
              className="lg:hidden w-10 h-10 mr-1 mt-0.5 flex items-center justify-center bg-gray-200 dark:bg-gray-800 
            transition-all duration-300 ease-in-out ring-2 ring-slate-700 dark:ring-slate-500 z-50
            backdrop-blur-md dark:hover:ring-slate-400 hover:ring-slate-800 hover:scale-110 pointer-events-auto rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="text-black dark:text-white" />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Dark overlay that blocks interactions when the sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main container */}
      <div className="flex flex-1 pt-[60px] md:pt-0">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative top-0 left-0 h-full lg:h-auto w-72 bg-slate-50 dark:bg-slate-900 
        text-black dark:text-white border-r border-gray-300 dark:border-gray-700 
        overflow-y-auto transition-transform duration-300 ease-in-out z-50
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } 
        lg:border-none`}
        >
          {/* Close button on mobile */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full"
              onClick={() => setIsSidebarOpen(false)}
            >
              <XMarkIcon className="text-black dark:text-white w-[2rem]" />
            </button>
          </div>

          <AdminSidebar setIsSidebarOpen={setIsSidebarOpen} />
        </aside>

        {/* Divider line on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 dark:bg-gray-700 z-50"></div>

        {/* Main content */}
        <main className="flex-1 p-5 md:pt-16 lg:pt-5 bg-slate-50 dark:bg-slate-900 text-black dark:text-white">
          {children}
        </main>
      </div>

      <ToastNotification />
    </div>
  );
}
