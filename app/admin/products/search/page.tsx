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
      <Heading>Resultados de búsqueda: {search}</Heading>

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
