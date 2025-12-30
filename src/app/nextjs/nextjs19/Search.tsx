"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const query = searchParams.get("query") ?? "";

  // TODO: Реализуйте функцию updateURL для объединения параметров
  // - Создайте URLSearchParams из текущих параметров
  // - Если query пустой, удалите параметр "query"
  // - Если query не пустой, установите параметр "query"
  // - Всегда сбрасывайте страницу на 1 при изменении поиска
  // - Используйте router.replace() для обновления URL
  const updateURL = (newQuery: string) => {
    // Напишите код здесь
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateURL(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Поиск по названию..."
        onChange={handleSearch}
        defaultValue={query}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}