import { prisma } from "@/src/lib/prisma";

import Heading from "@/components/ui/Heading";
import ProductTable from "@/components/products/ProductsTable";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function searchProducts(searchTerms: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerms, // filter
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const search = (await searchParams).search;

  const products = await searchProducts(search);

  return (
    <>
      <div className="mt-0 md:mt-5 lg:mt-10">
        <Heading>Resultados de búsqueda: {search}</Heading>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg mt-10 font-medium">
          No hay resultados.
        </p>
      )}
    </>
  );
}
