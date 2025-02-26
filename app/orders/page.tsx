"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { OrderWithProducts } from "@/src/types";

import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/themes/ThemeToggle";
import LatestOrderItem from "@/components/order/LatestOrderItem";

const fetchCompletedOrders = async () => {
  const res = await fetch(`/orders/api`);
  if (!res.ok) throw new Error("Error al obtener ordenes.");
  return res.json();
};

export default function OrdersPage() {
  const {
    data: completedOrders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["completed-orders"],
    queryFn: fetchCompletedOrders,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["completed-orders"] });
  };

  useEffect(() => {
    const handleFocus = () => {
      queryClient.refetchQueries({ queryKey: ["completed-orders"] });
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-14">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="text-center text-xl font-bold italic mt-4">
          Cargando órdenes listas...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center py-8 text-xl font-bold italic text-red-500">
        Error al cargar órdenes.
      </p>
    );

  if (completedOrders)
    return (
      <>
        <div
          className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 
        backdrop-blur-md shadow-md md:shadow-none border-b md:border-none border-gray-200 dark:border-gray-800"
        >
          <div className="flex justify-end items-center pt-3 px-4 py-3 bg-white lg:bg-slate-50 shadow-md lg:shadow-none dark:shadow-slate-700 dark:bg-slate-800 lg:dark:bg-slate-900">
            <ThemeToggle />
          </div>
        </div>

        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-black dark:text-white flex flex-col items-center">
          <h1 className="text-center pt-20 text-5xl md:text-6xl font-extrabold tracking-tight">
            Ordenes Listas
          </h1>

          <Logo />

          <form
            className="w-full flex justify-center mt-8"
            action={handleRefresh}
          >
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white text-lg md:text-xl font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-600"
            >
              Actualizar Órdenes
            </button>
          </form>

          {completedOrders.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full px-4 md:px-8 py-10">
              {completedOrders.map((order: OrderWithProducts) => (
                <LatestOrderItem key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <p className="text-center my-10 text-lg text-gray-700 dark:text-gray-300">
              No hay órdenes listas
            </p>
          )}
        </div>
      </>
    );
}
