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
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El pedido esta vació.</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductoDetails key={item.id} item={item} />
          ))}
        </div>
      )}

      <p className="text-2xl mt-20 text-center">
        Total a pagar: <span className="font-bold">{total.toFixed(2)}</span>
      </p>

      <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
        <input
          type="text"
          placeholder="Tu nombre"
          className="bg-white border border-gray-100 p-2 w-full"
          name="name"
        />

        <input
          type="submit"
          className="py-2 rounded uppercase text-white bg-slate-900 hover:bg-slate-950 transition-colors duration-300 ease-in-out w-full text-center cursor-pointer font-bold"
          value={"Confirmar Pedido"}
        />
      </form>
    </aside>
  );
}
