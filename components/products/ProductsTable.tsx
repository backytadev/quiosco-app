import Link from "next/link";

import { formatCurrency } from "@/src/utils";
import { ProductsWithCategory } from "@/app/admin/products/page";

type ProductTableProps = {
  products: ProductsWithCategory;
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-5">
      <p className="text-3xl text-center font-bold">Tabla de productos</p>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="rounded-md inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 p-5 bg-slate-50 dark:bg-slate-900 text-black dark:text-white">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold dark:text-white text-gray-900 sm:pl-0"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold dark:text-white text-gray-900"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold dark:text-white text-gray-900"
                  >
                    Categoría
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium dark:text-white text-gray-900 sm:pl-0">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-white text-gray-500">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-white text-gray-500">
                      {product.category.name}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-500 hover:dark:text-indigo-400"
                      >
                        {" "}
                        Editar <span className="sr-only">, {product.name}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
