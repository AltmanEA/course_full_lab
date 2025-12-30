import Pagination from "./Pagination";
import { getPaginatedItems, getTotalPages } from "./data";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PaginationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawPage = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 5;
  const totalPages = getTotalPages(ITEMS_PER_PAGE);

  // Fallback для некорректных номеров страниц
  const currentPage = rawPage < 1 ? 1 : rawPage > totalPages ? 1 : rawPage;
  const paginatedItems = getPaginatedItems(currentPage, ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Пагинация с URL параметрами
        </h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">ID</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Название</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-right">Цена</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600 text-right">
                    {item.price} ₽
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}