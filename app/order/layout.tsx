import ThemeToggle from "@/components/themes/ThemeToggle";
import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 text-black dark:text-white">
      {/* Theme toggle button */}
      <div
        className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 
    backdrop-blur-md shadow-md md:shadow-none border-b md:border-none border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-end items-center pt-3 px-4 py-3 lg:p-0 lg:hidden bg-white lg:bg-slate-50 shadow-md lg:shadow-none dark:shadow-slate-700 dark:bg-slate-800 lg:dark:bg-slate-900">
          <ThemeToggle />
        </div>
      </div>

      {/* Menu toggle */}
      <input type="checkbox" id="menu-toggle" className="hidden peer" />

      {/* Mobile menu button */}
      <label
        htmlFor="menu-toggle"
        className="fixed top-0 right-20 z-50 mt-3 py-2.5 px-2 rounded-lg bg-gray-200 dark:bg-gray-800
        transition-all duration-300 ease-in-out ring-2 ring-slate-700 dark:ring-slate-500 
        backdrop-blur-md dark:hover:ring-slate-400 hover:ring-slate-800 hover:scale-110 cursor-pointer lg:hidden"
      >
        <div className="w-6 h-1 bg-black dark:bg-white mb-1 rounded transition-all"></div>
        <div className="w-6 h-1 bg-black dark:bg-white mb-1 rounded transition-all"></div>
        <div className="w-6 h-1 bg-black dark:bg-white rounded transition-all"></div>
      </label>

      {/* Overlay to close the menu on mobile */}
      <label
        htmlFor="menu-toggle"
        className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden peer-checked:block lg:hidden"
      ></label>

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 w-72 h-screen lg:h-auto bg-slate-50 dark:bg-slate-900 shadow-lg 
        -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out 
        z-50 lg:relative lg:translate-x-0 lg:w-72 lg:block overflow-y-auto overflow-x-hidden"
      >
        {/* Close button on mobile */}
        <div className="flex justify-end p-4 lg:hidden">
          <label htmlFor="menu-toggle" className="cursor-pointer text-2xl">
            ✖️
          </label>
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
