import { prisma } from "@/src/lib/prisma";

import Heading from "@/components/ui/Heading";
import GoBackButton from "@/components/ui/GoBackButton";
import ProductForm from "@/components/products/ProductForm";
import EditProductForm from "@/components/products/EditProductForm";

import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProductById(+id);

  return (
    <>
      <div className="mt-0 md:mt-5 lg:mt-10">
        <Heading>Editar Producto: {product.name}</Heading>
      </div>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
