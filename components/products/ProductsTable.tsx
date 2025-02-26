import Link from "next/link";

import { formatCurrency } from "@/src/utils";
import { ProductsWithCategory } from "@/app/admin/products/page";

type ProductTableProps = {
  products: ProductsWithCategory;
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-5">
      {/* Título */}
      <p className="text-3xl text-center font-bold">Tabla de productos</p>

      <div className="mt-8">
        {/* Para pantallas grandes: tabla */}
        <div className="hidden md:block bg-slate-50 dark:bg-slate-900 p-5 rounded-md shadow-md">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                  Producto
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Precio
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Categoría
                </th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {product.category.name}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-500 hover:dark:text-indigo-400"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Para móviles: Tarjetas */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border dark:border-slate-700 dark:shadow-slate-700 rounded-lg shadow-md bg-white dark:bg-gray-900"
            >
              <p className="text-lg font-bold">{product.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Precio: {formatCurrency(product.price)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Categoría: {product.category.name}
              </p>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="mt-2 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Editar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
