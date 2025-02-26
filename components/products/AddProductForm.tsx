"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { ProductSchema } from "@/src/schema";
import { createProduct } from "@/actions/create-product-action";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    const response = await createProduct(result.data);
    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });

      return;
    }

    toast.success("Producto creado correctamente.");
    router.push("/admin/products");
  };

  return (
    <div className="bg-white dark:bg-gray-800 mt-10 px-6 py-8 rounded-2xl shadow-xl dark:shadow-md max-w-3xl mx-auto transition-all duration-300">
      <form className="space-y-6 w-full" action={handleSubmit}>
        <p className="text-center font-bold text-2xl">Formulario de Registro</p>
        {children}

        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 
          uppercase font-bold cursor-pointer transition-all duration-300 ease-in-out 
          rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 
          disabled:opacity-50 disabled:cursor-not-allowed"
          value="Registrar Producto"
        />
      </form>
    </div>
  );
}
