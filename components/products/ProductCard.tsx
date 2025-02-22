import Image from "next/image";
import { Product } from "@prisma/client";

import { formatCurrency, getImagePath } from "@/src/utils";
import AddProductButton from "@/components/products/AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="border h-full bg-white">
      <Image
        width={400}
        height={500}
        src={imagePath}
        alt={`Imagen platillo ${product.name}`}
        className="w-full"
      />

      <div className="p-5 flex flex-col justify-end">
        <h3 className="text-2xl font-bold h-auto xl:h-16">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>

        <AddProductButton product={product} />
      </div>
    </div>
  );
}
