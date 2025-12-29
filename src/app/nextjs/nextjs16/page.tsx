import { fetchRevenue, fetchStats } from "./data";
import Header from "./Header";
import Stats from "./Stats";
import RevenueChart from "./RevenueChart";

// ЗАДАНИЕ: Все данные загружаются на уровне страницы
// Пользователь видит пустую страницу пока не загрузятся ВСЕ данные
// TODO: Перенести fetchRevenue() в компонент RevenueChart
// TODO: Обернуть RevenueChart в Suspense с skeleton fallback
// TODO: Убрать проп data из RevenueChart

export default async function DashboardPage() {
  // Параллельная загрузка данных на уровне страницы
  const revenueData = await fetchRevenue();
  const statsData = await fetchStats();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Stats data={statsData} />
        <RevenueChart data={revenueData} />
      </div>
    </main>
  );
}