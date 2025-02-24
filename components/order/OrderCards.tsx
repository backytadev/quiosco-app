import { useTransition } from "react";

import { formatCurrency } from "@/src/utils";
import { OrderWithProducts } from "@/src/types";

import { useQueryClient } from "@tanstack/react-query";
import { completeOrder } from "@/actions/complete-order-action";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleCompleteOrder = async (formData: FormData) => {
    startTransition(async () => {
      await completeOrder(formData);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-10 rounded-xl bg-gray-50 dark:bg-gray-800 px-6 py-6 sm:p-6 lg:mt-0 border border-slate-200 dark:border-slate-600 lg:p-8 shadow-md hover:shadow-lg dark:hover:shadow-gray-700 transition-all duration-300 ease-in-out"
    >
      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
        Cliente: {order.name}
      </p>
      <p className="text-lg font-medium text-gray-900 dark:text-gray-300 mt-2">
        Productos Ordenados:
      </p>
      <dl className="mt-4 space-y-4">
        {order.orderProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4"
          >
            <dt className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-800 dark:text-gray-200">
                ({product.quantity}) {""}
              </span>
            </dt>
            <dd className="text-sm font-medium text-gray-900 dark:text-white">
              {product.product.name}
            </dd>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <dt className="text-lg font-medium text-gray-900 dark:text-gray-300">
            Total a Pagar:
          </dt>
          <dd className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={handleCompleteOrder} className="mt-6">
        <input type="hidden" value={order.id} name="order_id" />
        <button
          type="submit"
          disabled={isPending}
          className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-lg font-bold uppercase shadow-md hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600"
        >
          {isPending ? "Procesando..." : "Marcar Orden Completada"}
        </button>
      </form>
    </section>
  );
}
