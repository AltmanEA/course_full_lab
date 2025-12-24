import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className={`text-4xl font-bold text-center mb-8 ${inter.className}`}>
          Next.js Optimization Demo
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className={`text-2xl font-semibold mb-4 ${inter.className}`}>
            Optimized Image Example
          </h2>
          
          {/* TODO: Замените обычный img на next/image */}
          <img
            src="/images/nextjs01.webp"
            alt="Example"
            className="w-full h-64 object-cover rounded"
          />
          
          <p className={`text-gray-600 mt-4 ${inter.className}`}>
            This image should be optimized using next/image component
          </p>
        </div>
      </div>
    </main>
  );
}