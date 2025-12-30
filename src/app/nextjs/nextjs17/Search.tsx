"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // TODO: Установите начальное значение input из searchParams
  }, [searchParams]);

  // TODO: Реализуйте функцию handleSearch с debounce (300мс) и router.push()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ваш код здесь
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
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}