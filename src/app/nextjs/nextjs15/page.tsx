export default async function DashboardPage() {
  // Имитация загрузки данных
  await new Promise(resolve => setTimeout(resolve, 5000));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}