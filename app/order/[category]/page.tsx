"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Heading from "@/components/ui/Heading";
import ProductCard from "@/components/products/ProductCard";

interface ProductResultProps {
  name: string;
  id: number;
  price: number;
  image: string;
  categoryId: number;
}

const fetchProducts = async (category: string) => {
  const res = await fetch(`/order/${category}/api`);
  if (!res.ok) throw new Error("Error al obtener productos");
  const data = await res.json();

  return data.sort(
    (a: ProductResultProps, b: ProductResultProps) => a.id - b.id
  );
};

export default function OrderPage() {
  const params = useParams();
  const category = params?.category as string;

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => await fetchProducts(category!),
    enabled: !!category,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="text-center text-xl font-bold italic mt-4">
          Cargando productos...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center py-8 text-xl font-bold italic text-red-500">
        Error al cargar productos.
      </p>
    );

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuación.</Heading>

      <div className="relative">
        <div
          className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 items-start
         px-4 pb-4"
        >
          {products?.map((product: ProductResultProps) => (
            <div key={product.id} className="snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
