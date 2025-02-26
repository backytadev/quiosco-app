import { Dispatch, SetStateAction } from "react";

import Logo from "@/components/ui/Logo";
import AdminRoute from "@/components/admin/AdminRoute";

const adminNavigation = {
  Ventas: [
    { url: "/order/cafe", text: "Ver Quiosco", blank: true },
    { url: "/admin/products", text: "Productos", blank: false },
  ],
  Cocina: [{ url: "/admin/orders", text: "Órdenes (Cocina)", blank: false }],
  Cliente: [{ url: "/orders", text: "Órdenes Listas (Cliente)", blank: true }],
};

interface AdminSidebarProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminSidebar({ setIsSidebarOpen }: AdminSidebarProps) {
  return (
    <aside className="p-5 pb-10 lg:pb-0 -mt-10 lg:mt-0 rounded-lg bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center">
        <Logo />
        <p className="mt-6 uppercase font-bold text-sm text-gray-600 dark:text-gray-300">
          Panel de Control
        </p>
      </div>

      <nav className="mt-6 space-y-6">
        {Object.entries(adminNavigation).map(([section, links]) => (
          <div key={section} className="rounded-lg shadow-md overflow-hidden">
            <h2 className="text-lg font-bold text-white bg-amber-500 px-4 py-2 uppercase">
              {section}
            </h2>

            <div className="bg-gray-50 dark:bg-gray-800 p-3 space-y-3">
              {links.map((link) => (
                <AdminRoute
                  key={link.url}
                  link={link}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
