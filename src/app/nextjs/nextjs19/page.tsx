import Pagination from "./Pagination";
import Search from "./Search";
import {
  getFilteredAndPaginatedItems,
  getTotalFilteredPages,
} from "./data";

interface PageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function SearchPaginationPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query ?? "";
  const rawPage = Number(resolvedParams.page) || 1;
  const ITEMS_PER_PAGE = 5;

  const totalPages = getTotalFilteredPages(query, ITEMS_PER_PAGE);

  // Fallback для некорректных номеров страниц
  const currentPage = rawPage < 1 ? 1 : rawPage > totalPages ? 1 : rawPage;

  // TODO: Передайте оба параметра query и currentPage в функцию getFilteredAndPaginatedItems
  const paginatedItems = getFilteredAndPaginatedItems(
    query,
    currentPage,
    ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Комбинированный поиск и пагинация
        </h1>

        <Search />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">ID</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Название</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Категория</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-right">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.category}</td>
                  <td className="px-4 py-3 text-gray-600 text-right">
                    {item.price.toLocaleString()} ₽
                  </td>
                </tr>
              ))}
              {paginatedItems.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Ничего не найдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination totalPages={totalPages} />
        )}
      </div>
    </main>
  );
}