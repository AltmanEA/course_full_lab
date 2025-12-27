export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Navigation with Link Component
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Navigation Examples
          </h2>
          
          <div className="space-y-4">
            {/* TODO: Замените теги <a> на компонент Link из next/link */}
            <a href="/nextjs/nextjs01" className="text-blue-600 hover:underline">
              Go to Next.js 01 Task
            </a>
            
            <a href="/nextjs/nextjs02" className="text-blue-600 hover:underline">
              Go to Next.js 02 Task
            </a>
            
            <a href="/nextjs/nextjs03" className="text-blue-600 hover:underline">
              Go to Next.js 03 Task
            </a>
          </div>
          
          <p className="text-gray-600 mt-6">
            These links should use the Link component for client-side navigation
          </p>
        </div>
      </div>
    </main>
  );
}