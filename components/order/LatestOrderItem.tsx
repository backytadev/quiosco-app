import { OrderWithProducts } from "@/src/types";

type LatestOrderItemProps = {
  order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <div className="shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700 p-6 rounded-xl bg-white dark:bg-slate-800 transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Cliente:{" "}
        <span className="text-indigo-600 dark:text-indigo-400">
          {order.name}
        </span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
        Su pedido es:
      </p>

      <ul
        role="list"
        className="divide-y divide-gray-300 dark:divide-gray-600 mt-4"
      >
        {order.orderProducts.map((product) => (
          <li key={product.id} className="flex items-center py-4 text-lg">
            <span className="text-indigo-500 dark:text-indigo-400 font-bold">
              ({product.quantity})
            </span>
            <span className="ml-3 text-gray-900 dark:text-gray-100">
              {product.product.name}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6">
        ¡Gracias por su preferencia!
      </p>
    </div>
  );
}
