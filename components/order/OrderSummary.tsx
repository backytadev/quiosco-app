"use client";

import { useMemo } from "react";
import { toast } from "react-toastify";

import { OrderSchema } from "@/src/schema";
import { useStore } from "@/src/store/store";

import { createOrder } from "@/actions/create-order-action";
import ProductoDetails from "@/components/order/ProductoDetails";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);

  const total = useMemo(
    () => order.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    //* Client validation
    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    //* Server validation using same schema (send validation errors to server, and return to client for rendering)
    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message));
    }

    toast.success("Pedido realizado correctamente");
    clearOrder();
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

      <form className="w-full mt-8 space-y-5" action={handleCreateOrder}>
        <input
          type="text"
          placeholder="Tu nombre"
          className="bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 p-3 w-full rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition-all"
          name="name"
        />

        <input
          type="submit"
          className="py-3 rounded-md uppercase text-white bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 hover:dark:bg-amber-500 transition-all duration-300 ease-in-out w-full text-center cursor-pointer font-bold shadow-md"
          value="Confirmar Pedido"
        />
      </form>
    </aside>
  );
}
