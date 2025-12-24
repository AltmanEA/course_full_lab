import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Lazy Loading Demo
        </h1>
        
        <div className="space-y-8">
          {/* TODO: Добавьте lazy loading для изображений */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Image Gallery
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Image
                  src="/images/nextjs01.webp"
                  alt="Gallery Image 1"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded"
                  loading="eager"
                />
                <p className="text-sm text-gray-600 mt-2">Image 1</p>
              </div>
              
              <div>
                <Image
                  src="/images/nextjs01.webp"
                  alt="Gallery Image 2"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded"
                  loading="eager"
                />
                <p className="text-sm text-gray-600 mt-2">Image 2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Performance Benefits
            </h2>
            <p className="text-gray-600">
              Images should load only when they are about to enter the viewport
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}