import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10 gap-2">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 shadow-md"
        >
          &laquo;
        </Link>
      )}

      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
          className={`px-4 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 dark:ring-gray-600 rounded-md transition-all duration-300 shadow-md ${
            page === currentPage
              ? "bg-amber-400 text-white font-bold dark:bg-amber-500"
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
          }`}
        >
          {currentPage}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 shadow-md"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
