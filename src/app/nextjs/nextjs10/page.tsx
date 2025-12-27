// TODO: Сделайте компонент асинхронным и загрузите данные

function Home() {
  const users = ["User 1", "User 2", "User 3"];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Async Data Fetching Demo
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">User List</h2>

          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user} className="p-3 bg-gray-50 rounded">
                {user}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-gray-600 mt-4">
          This component should fetch data asynchronously
        </p>
      </div>
    </main>
  );
}

export default Home;