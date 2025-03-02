"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams<{ category?: string }>();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [params.category]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 text-black dark:text-white">
      {/* Theme toggle button */}
      <div
        className={`fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 
          backdrop-blur-md shadow-md md:shadow-none border-b md:border-none border-gray-200 dark:border-gray-800 
          ${isMenuOpen ? "pointer-events-none" : ""}`}
      >
        <div className="flex justify-end items-center pt-3 px-4 py-3 bg-white lg:bg-slate-50 shadow-md lg:shadow-none dark:shadow-slate-700 dark:bg-slate-800 lg:dark:bg-slate-900">
          <div className="flex items-center gap-3">
            {/* Button to open the menu on mobile */}
            <button
              className="lg:hidden w-10 h-10 mr-1 mt-0.5 flex items-center justify-center bg-gray-200 dark:bg-gray-800 
                transition-all duration-300 ease-in-out ring-2 ring-slate-700 dark:ring-slate-500 z-50
                backdrop-blur-md dark:hover:ring-slate-400 hover:ring-slate-800 hover:scale-110 pointer-events-auto rounded-md"
              onClick={() => setIsMenuOpen(true)}
            >
              <Bars3Icon className="text-black dark:text-white" />
            </button>

            {/* Theme toggle */}
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>

      {/* Overlay to close the menu on mobile */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full lg:h-auto bg-slate-50 dark:bg-slate-900 shadow-lg 
        transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:w-72 lg:block overflow-y-auto overflow-x-hidden`}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full"
          >
            <XMarkIcon className="text-black dark:text-white w-[2rem]" />
          </button>
        </div>

        <OrderSidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:px-32 lg:p-4 lg:pl-[1rem] h-screen lg:h-auto overflow-y-auto my-10 lg:my-0">
        {children}
      </main>

      <aside className="w-full lg:w-auto lg:relative">
        <OrderSummary />
      </aside>

      <ToastNotification />
    </div>
  );
}
