import { prisma } from "@/src/lib/prisma";

import Logo from "@/components/ui/Logo";
import CategoryIcon from "@/components/ui/CategoryIcon";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside
      className="w-72 bg-slate-50 dark:bg-slate-900 text-black dark:text-white border-r border-gray-300 dark:border-gray-700 
      sticky top-0 h-screen overflow-y-auto transition-all duration-300"
    >
      <div className="p-5 border-b border-gray-300 dark:border-gray-700">
        <Logo />
      </div>

      <nav className="mt-5 flex flex-col space-y-2 px-4">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}
