import { prisma } from "@/src/lib/prisma";

import Logo from "@/components/ui/Logo";
import CategoryIcon from "@/components/ui/CategoryIcon";
import ThemeToggle from "@/components/themes/ThemeToggle";

import { CookingPot } from "lucide-react";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside
      className="w-72 text-black dark:text-white border-r border-gray-300 dark:border-gray-700 
      sticky top-0 h-auto overflow-y-auto transition-all duration-300 pb-5"
    >
      <div className="p-5 border-b border-gray-300 dark:border-gray-700">
        <div className="hidden lg:flex justify-end items-center -mr-4 -mt-1 bg-white lg:bg-slate-50 shadow-md lg:shadow-none dark:shadow-slate-700 dark:bg-slate-800 lg:dark:bg-slate-900">
          <ThemeToggle />
        </div>
        <div className="-mt-10 lg:mt-0">
          <Logo />
        </div>
      </div>

      <nav className="my-5 flex flex-col space-y-2 pl-4 pr-6">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
        <a
          href="/admin/orders"
          className="flex lg:hidden items-center justify-center gap-3 font-semibold text-lg px-5 py-3 mt-6 
    bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-lg 
    transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl 
    focus:ring-2 focus:ring-amber-400 focus:outline-none"
        >
          <span className="text-center flex justify-center items-center">
            <CookingPot className="w-10 h-10 opacity-90 " /> Ver las órdenes
            (Cocina)
          </span>
        </a>
      </nav>
    </aside>
  );
}
