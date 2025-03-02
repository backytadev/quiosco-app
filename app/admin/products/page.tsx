import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";

import Heading from "@/components/ui/Heading";
import ProductTable from "@/components/products/ProductsTable";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductSearchForm from "@/components/products/ProductSearchForm";

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
    <div className="space-y-6">
      <div className="mt-0 md:mt-5 lg:mt-10">
        <Heading>Administrar Productos</Heading>
      </div>

      <div className="grid gap-4 md:flex md:items-center md:justify-between border dark:border-slate-700 bg-slate-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Link
          href={`/admin/products/new`}
          className="bg-amber-500 hover:bg-amber-600 text-white text-base md:text-base px-6 py-2 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform md:hover:scale-105 text-center md:w-auto uppercase"
        >
          Crear Producto
        </Link>

        <div className="w-full z-10 md:w-auto">
          <ProductSearchForm />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 border dark:border-slate-700 p-4 rounded-lg shadow-md">
        <ProductTable products={products} />
      </div>

      <div className="flex justify-center">
        <ProductsPagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
