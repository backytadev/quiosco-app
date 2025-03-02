"use client";

import { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import { OrderSchema } from "@/src/schema";
import { useStore } from "@/src/store/store";

import { createOrder } from "@/actions/create-order-action";
import ProductoDetails from "@/components/order/ProductoDetails";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const total = useMemo(
    () => order.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    //* Client validation
    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      setIsSubmitting(false);
      return;
    }

    try {
      //* Server validation
      const response = await createOrder(data);
      if (response?.errors) {
        response.errors.forEach((issue) => toast.error(issue.message));
        setIsSubmitting(false);
        return;
      }

      toast.success("Pedido realizado correctamente");
      clearOrder();
      if (nameRef.current) nameRef.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al procesar el pedido:");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="h-auto lg:h-auto lg:overflow-y-auto md:mx-auto md:w-auto lg:w-96 p-6 md:px-32 lg:p-6 bg-slate-50 dark:bg-slate-900 shadow-md dark:shadow-slate-700 rounded-lg">
      <h1 className="text-4xl text-center font-black text-slate-800 dark:text-white z-50">
        Mi Pedido
      </h1>

      {order.length === 0 ? (
        <p className="text-center my-10 text-gray-500 dark:text-gray-400">
          El pedido está vacío.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {order.map((item) => (
            <ProductoDetails key={item.id} item={item} />
          ))}
        </div>
      )}

      <p className="text-2xl mt-12 text-center text-gray-700 dark:text-gray-300">
        Total a pagar:{" "}
        <span className="font-bold text-slate-900 dark:text-white">
          {total.toFixed(2)}
        </span>
      </p>

      <form className="w-full mt-8 space-y-5" onSubmit={handleCreateOrder}>
        <input
          ref={nameRef}
          type="text"
          placeholder="Tu nombre"
          className="bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 p-3 w-full rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition-all"
          name="name"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-3 rounded-md uppercase text-white font-bold shadow-md w-full text-center transition-all duration-300 ease-in-out cursor-pointer
            ${
              isSubmitting
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 hover:dark:bg-amber-600"
            }`}
        >
          {isSubmitting ? "Generando pedido..." : "Confirmar Pedido"}
        </button>
      </form>
    </aside>
  );
}
