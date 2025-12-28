// TODO: Добавьте кэширование для статического рендеринга

function Home() {
  // TODO: Замените на асинхронную функцию getData() с fetch и { cache: 'force-cache' }
  const data = { message: "Loading..." };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Static Rendering with Caching
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Data from API</h2>
          
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-lg">{data.message}</p>
          </div>
        </div>

        <p className="text-gray-600 mt-4">
          This page should use static rendering with cached data
        </p>
      </div>
    </main>
  );
}

export default Home;