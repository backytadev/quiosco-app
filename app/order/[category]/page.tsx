import { prisma } from "@/src/lib/prisma";

import Heading from "@/components/ui/Heading";
import ProductCard from "@/components/products/ProductCard";

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

export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;

  const products = await getProducts(category);

  return (
    <>
      <Heading> Elige y personaliza tu pedido a continuación.</Heading>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
