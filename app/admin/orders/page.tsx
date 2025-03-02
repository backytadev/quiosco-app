"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { OrderWithProducts } from "@/src/types";

import Heading from "@/components/ui/Heading";
import OrderCards from "@/components/order/OrderCards";

const fetchPendingOrders = async () => {
  const res = await fetch(`/admin/orders/api`);
  if (!res.ok) throw new Error("Error al obtener ordenes.");
  return res.json();
};

export default function Orders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchPendingOrders,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  useEffect(() => {
    const handleFocus = () => {
      queryClient.refetchQueries({ queryKey: ["orders"] });
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-14 min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="text-center text-xl font-bold italic mt-4">
          Cargando órdenes...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center py-8 text-xl font-bold italic text-red-500">
        Error al cargar órdenes.
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-black dark:text-white flex flex-col items-center py-10">
      <Heading>Administrar órdenes</Heading>

      <form className="mt-5" action={handleRefresh}>
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform md:hover:scale-105 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-600"
        >
          Actualizar Órdenes
        </button>
      </form>

      {orders?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8 w-full max-w-6xl px-4 md:px-8">
          {orders.map((order: OrderWithProducts) => (
            <OrderCards key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-lg text-gray-700 dark:text-gray-300 font-medium">
          No hay órdenes pendientes.
        </p>
      )}
    </div>
  );
}

//* Option with SWR
// const url = "/admin/orders/api";
// const fetcher = () =>
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => data);

// const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
//   refreshInterval: 6000,
//   revalidateOnFocus: false,
// });

// if (isLoading) {
//   return "Cargando...";
// }

// if (data)
//   return (
//     <>
//       <Heading>Administrar ordenes.</Heading>

//       {data.length ? (
//         <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
//           {data.map((order) => (
//             <OrderCards key={order.id} order={order} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center">No hay ordenes pendientes</p>
//       )}
//     </>
//   );
