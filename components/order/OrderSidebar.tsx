import { prisma } from "@/src/lib/prisma";

import Logo from "@/components/ui/Logo";
import CategoryIcon from "@/components/ui/CategoryIcon";
import ThemeToggle from "@/components/themes/ThemeToggle";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside
      className="w-72 text-black dark:text-white border-r border-gray-300 dark:border-gray-700 
      sticky top-0 h-auto overflow-y-auto transition-all duration-300"
    >
      <div className="p-5 border-b border-gray-300 dark:border-gray-700">
        <div className="hidden lg:flex justify-end items-center -mr-4 -mt-1 bg-white lg:bg-slate-50 shadow-md lg:shadow-none dark:shadow-slate-700 dark:bg-slate-800 lg:dark:bg-slate-900">
          <ThemeToggle />
        </div>
        <Logo />
      </div>

      <nav className="my-5 flex flex-col space-y-2 pl-4 pr-6">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}
