'use client';

import { usePathname } from 'next/navigation';

export default function DashboardNav() {
  // Используем usePathname для определения текущего пути
  const currentPath = usePathname();
  
  // Логируем каждый рендер компонента для отслеживания
  console.log(`DashboardNav rendered on path: ${currentPath}`);
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex space-x-8">
            <a 
              href="/nextjs/nextjs05" 
              className={currentPath === '/nextjs/nextjs05' 
                ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
                : "text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              }
            >
              Home
            </a>
            <a 
              href="/nextjs/nextjs05/settings" 
              className={currentPath === '/nextjs/nextjs05/settings'
                ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
                : "text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              }
            >
              Settings
            </a>
            <a 
              href="/nextjs/nextjs05/profile" 
              className={currentPath === '/nextjs/nextjs05/profile'
                ? "text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium"
                : "text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              }
            >
              Profile
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}