import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";

import Heading from "@/components/ui/Heading";
import OrderCards from "@/components/order/OrderCards";

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

export default async function Orders() {
  const orders = await getPendingOrders();

  const refreshOrders = async () => {
    "use server";
    revalidatePath("/admin/orders");
  };

  return (
    <>
      <Heading>Administrar ordenes.</Heading>

      <form action={refreshOrders}>
        <input
          type="submit"
          value={"Actualizar Ordenes"}
          className="bg-amber-400 hover:bg-amber-500 transition-colors duration-300 ease-in-out w-full lg:w-auto text-center text-xl px-10 py-3 font-bold cursor-pointer"
        />
      </form>

      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCards key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay ordenes pendientes</p>
      )}
    </>
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
