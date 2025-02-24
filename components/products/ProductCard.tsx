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
    <div
      className="border h-full dark:border-slate-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
      transition-transform duration-300 hover:scale-105"
    >
      <Image
        width={400}
        height={300}
        src={imagePath}
        alt={`Imagen platillo ${product.name}`}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-5 flex flex-col justify-between flex-1">
        <h3 className="text-xl font-bold dark:text-white text-gray-900 h-auto xl:h-16">
          {product.name}
        </h3>

        <p className="mt-3 text-3xl font-extrabold text-amber-500">
          {formatCurrency(product.price)}
        </p>

        <div className="mt-5">
          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
}
