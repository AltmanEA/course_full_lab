export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Route Segments Demo
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Understanding Route Segments
          </h2>
          
          {/* TODO: Создайте правильную структуру папок для route segment */}
          <p className="text-gray-600">
            This page should be accessible at /demo path, not in the root
          </p>
          
          <div className="mt-6 space-y-4">
            <p className="text-lg">
              Route segments are created by folders in the app directory
            </p>
            <p className="text-xl font-semibold">
              Files create pages, folders create routes
            </p>
            <p className="text-sm text-gray-500">
              Current structure creates /nextjs/nextjs04, needs /demo subfolder
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}