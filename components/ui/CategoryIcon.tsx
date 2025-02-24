"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();
  const selectedCategory = params.category;

  const isSelected = category.slug === selectedCategory;

  return (
    <Link href={`/order/${category.slug}`} className="block">
      <div
        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 
        border border-gray-300 dark:border-gray-700 
        ${
          isSelected
            ? "bg-amber-500 dark:bg-amber-600 text-white"
            : "hover:bg-indigo-100 dark:hover:bg-indigo-800"
        } `}
      >
        <div className="w-14 h-14 relative">
          <Image
            src={`/icon_${category.slug}.svg`}
            alt={category.name}
            fill
            className="object-contain"
          />
        </div>

        <span className="text-lg font-semibold">{category.name}</span>
      </div>
    </Link>
  );
}
