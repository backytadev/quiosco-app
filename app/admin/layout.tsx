import ThemeToggle from "@/components/themes/ThemeToggle";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ToastNotification from "@/components/ui/ToastNotification";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex min-h-screen">
        <aside
          className="w-72 bg-slate-50 dark:bg-slate-900 text-black dark:text-white 
          border-r border-gray-300 dark:border-gray-700 sticky top-0 h-screen 
          overflow-y-auto transition-all duration-300"
        >
          <AdminSidebar />
        </aside>

        <main
          className="flex-1 min-h-screen p-5 bg-slate-50 dark:bg-slate-900 
        text-black dark:text-white relative border-l border-gray-300 dark:border-gray-700"
        >
          {children}
        </main>
      </div>

      <ToastNotification />
    </div>
  );
}
