import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";

import Heading from "@/components/ui/Heading";
import ProductTable from "@/components/products/ProductsTable";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductoSearchForm from "@/components/products/ProductoSearchForm";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true,
    },
  });

  return products;
}

// Defines the type based on the result of the promise
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = +(await searchParams).page || 1;
  const pageSize = 10;

  if (page <= 0) redirect("/admin/products");

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();

  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect("/admin/products?page=1");

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border dark:border-slate-700 mt-5 bg-slate-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
        <Link
          href={`/admin/products/new`}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-10 py-3 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full lg:w-auto text-center"
        >
          Crear Producto
        </Link>

        <ProductoSearchForm />
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-gray-800 border dark:border-slate-700 px-5 pb-5 pt-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
        <ProductTable products={products} />
      </div>

      <div className="mt-6 flex justify-center">
        <ProductsPagination page={page} totalPages={totalPages} />
      </div>
    </>
  );
}
