"use client";

import { useSearchParams } from "next/navigation";
import { products, type Product } from "./data";

export default function ProductTable() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() ?? "";

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">ID</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Название</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Категория</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-right">Цена</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-right">На складе</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                Ничего не найдено
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">{product.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                <td className="px-4 py-3 text-gray-600">{product.category}</td>
                <td className="px-4 py-3 text-gray-600 text-right">
                  {product.price.toLocaleString()} ₽
                </td>
                <td className="px-4 py-3 text-gray-600 text-right">{product.stock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}