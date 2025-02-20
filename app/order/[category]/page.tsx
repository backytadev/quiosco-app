import { prisma } from "@/src/lib/prisma";

import ProductCard from "@/components/products/ProductCard";
import { unstable_cache } from "next/cache";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });

  return products;
}

const cachedGetProducts = unstable_cache(getProducts, ["products"], {
  revalidate: 60,
});

export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  const products = await cachedGetProducts(category);

  return (
    <>
      <h1 className="text-2xl font-black py-5">
        Elige y personaliza tu pedido a continuación.
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
