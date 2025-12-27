export default function Success() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center mb-4 text-green-600">
            Success!
          </h1>
          
          <p className="text-gray-600 text-center">
            You have successfully subscribed to our newsletter.
          </p>
          
          <div className="mt-6 text-center">
            <a
              href="/nextjs/nextjs08"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Go back to form
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
