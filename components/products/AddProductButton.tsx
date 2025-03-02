"use client";

import { toast } from "react-toastify";

import { Product } from "@prisma/client";
import { useStore } from "@/src/store/store";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder);

  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
      onClick={() => {
        addToOrder(product);
        toast.success("Producto agregado correctamente");
      }}
    >
      Agregar
    </button>
  );
}
