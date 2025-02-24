"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 
                 text-white text-xl px-8 py-3 font-bold 
                 rounded-lg transition-all duration-300 ease-in-out 
                 shadow-md dark:shadow-lg w-full lg:w-auto"
    >
      Volver
    </button>
  );
}
