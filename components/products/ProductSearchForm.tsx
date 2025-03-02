"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { searchSchema } from "@/src/schema";

export default function ProductSearchForm() {
  const router = useRouter();

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = searchSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form
      action={handleSearchForm}
      className="flex items-center bg-gray-50 dark:bg-gray-800 p-2 border dark:border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <input
        type="text"
        placeholder="Buscar Producto"
        name="search"
        className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-l-lg placeholder-gray-400 dark:placeholder-gray-300 text-black dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="submit"
        value="Buscar"
        className="border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 text-white p-2 uppercase font-bold cursor-pointer rounded-r-lg transition-all duration-300 ease-in-out transform md:hover:scale-105 hover:shadow-lg text-base"
      />
    </form>
  );
}
