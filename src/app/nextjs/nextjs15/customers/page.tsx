export default async function CustomersPage() {
  // Имитация загрузки данных
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <p>Manage your customers here.</p>
    </div>
  );
}