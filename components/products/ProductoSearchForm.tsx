"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { searchSchema } from "@/src/schema";

export default function ProductoSearchForm() {
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
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
      />

      <input
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 p-2 uppercase text-white cursor-pointer transition-colors duration-300 ease-in-out"
        value={"Buscar"}
      />
    </form>
  );
}
