"use client";

import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();
  const selectedCategory = params.category;

  return (
    <Link href={`/order/${category.slug}`} className="text-xl font-bold">
      <div
        className={`${
          category.slug === selectedCategory ? "bg-amber-400" : ""
        } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
      >
        <div className="w-16 h-16 relative">
          <Image src={`/icon_${category.slug}.svg`} alt={category.name} fill />
        </div>

        {category.name}
      </div>
    </Link>
  );
}
