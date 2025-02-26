"use client";

import { Dispatch, SetStateAction } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AdminRoute({
  link,
  setIsSidebarOpen,
}: AdminRouteProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.url);

  return (
    <Link
      href={link.url}
      target={link.blank ? "_blank" : ""}
      onClick={() => setIsSidebarOpen(false)}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center font-bold text-lg px-4 py-3 border-t border-b
        transition-all duration-300 ease-in-out rounded-lg dark:border-slate-500
        ${
          isActive
            ? "bg-amber-500 text-white dark:bg-amber-500 shadow-md"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
        }
        hover:scale-105
      `}
    >
      {link.text}
    </Link>
  );
}
