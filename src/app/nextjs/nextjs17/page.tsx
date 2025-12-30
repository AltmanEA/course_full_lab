import { Suspense } from "react";
import Search from "./Search";
import ProductTable from "./ProductTable";

function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-100 border-b"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 border-b border-gray-50 bg-white"></div>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Поиск товаров
        </h1>
        <p className="text-gray-600 mb-6">
          Начните вводить название товара для поиска
        </p>
        <Search />
        <Suspense fallback={<TableSkeleton />}>
          <ProductTable />
        </Suspense>
      </div>
    </main>
  );
}