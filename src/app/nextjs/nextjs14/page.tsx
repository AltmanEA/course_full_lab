import { getDashboardData } from "./data";

async function DashboardPage() {
  // Async data fetching — will trigger Suspense
  const data = await getDashboardData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Dashboard
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Data</h2>
          
          <div className="p-4 bg-gray-50 rounded space-y-2">
            <p className="text-lg">{data.message}</p>
            <p className="text-gray-500">Users: {data.users}</p>
            <p className="text-gray-500">Status: {data.status}</p>
            <p className="text-sm text-gray-400">Timestamp: {data.timestamp}</p>
          </div>
        </div>

        <p className="text-gray-600 mt-4">
          This page uses streaming with loading.tsx
        </p>
      </div>
    </main>
  );
}

export default DashboardPage;