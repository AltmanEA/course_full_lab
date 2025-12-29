export default async function InvoicesPage() {
  // Имитация загрузки данных
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <p>Manage your invoices here.</p>
    </div>
  );
}