import { useMemo } from "react";

import { PlusIcon, MinusIcon, XCircleIcon } from "@heroicons/react/20/solid";

import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store/store";

type ProductoDetailsProps = {
  item: OrderItem;
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export default function ProductoDetails({ item }: ProductoDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeItem = useStore((state) => state.removeItem);

  const disabledDecreaseButton = useMemo(
    () => item.quantity === MIN_ITEMS,
    [item]
  );
  const disabledIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );

  return (
    <div className="shadow-md dark:shadow-lg rounded-lg p-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {item.name}
          </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-500 hover:text-red-600 transition-all h-7 w-7" />
          </button>
        </div>

        <p className="text-2xl font-black text-amber-500">
          {formatCurrency(item.price)}
        </p>

        <div className="flex items-center justify-center gap-6 px-6 py-2 bg-gray-100 dark:bg-slate-700 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disabledDecreaseButton}
            className="disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all rounded p-1"
          >
            <MinusIcon className="h-6 w-6 text-gray-700 dark:text-gray-100" />
          </button>

          <p className="text-lg font-black text-gray-800 dark:text-gray-100">
            {item.quantity}
          </p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={disabledIncreaseButton}
            className="disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all rounded p-1"
          >
            <PlusIcon className="h-6 w-6 text-gray-700 dark:text-gray-100" />
          </button>
        </div>

        <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
          Subtotal:{" "}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
