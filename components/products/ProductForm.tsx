import { Product } from "@prisma/client";

import { prisma } from "@/src/lib/prisma";
import ImageUpload from "@/components/products/ImageUpload";

async function getCategories() {
  return await prisma.category.findMany();
}

type ProductFormProps = {
  product?: Product;
};

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories();

  return (
    <>
      <div className="space-y-2">
        <label
          className="text-gray-700 dark:text-gray-200 font-semibold text-sm"
          htmlFor="name"
        >
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="block w-full p-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg 
          border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 
          placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Nombre del Producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-gray-700 dark:text-gray-200 font-semibold text-sm"
          htmlFor="price"
        >
          Precio:
        </label>
        <input
          id="price"
          type="number"
          name="price"
          required
          min="0"
          step="0.01"
          className="block w-full p-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg 
          border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 
          placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Precio del Producto"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-gray-700 dark:text-gray-200 font-semibold text-sm"
          htmlFor="categoryId"
        >
          Categoría:
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          className="block w-full p-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg 
          border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 
          placeholder-gray-500 dark:placeholder-gray-400"
          defaultValue={product?.categoryId || ""}
        >
          <option value="" disabled>
            -- Seleccione --
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUpload image={product?.image} />
    </>
  );
}
