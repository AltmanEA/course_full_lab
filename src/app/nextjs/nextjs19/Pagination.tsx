"use client";

import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) ?? 1;

  // TODO: Создайте функцию createPageURL(pageNumber) используя URLSearchParams
  // - Создайте новый URLSearchParams из текущих параметров
  // - Установите параметр "page" в значение pageNumber
  // - Сохраните параметр "query" если он существует
  // - Используйте router.replace() для обновления URL
  const createPageURL = (pageNumber: number) => {
    // Напишите код здесь
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Предыдущая
      </button>
      <span className="px-4 py-2">
        Страница {currentPage} из {totalPages}
      </span>
      <button
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Следующая
      </button>
    </div>
  );
}