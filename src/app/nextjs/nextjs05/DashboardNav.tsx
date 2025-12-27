'use client';

import Link from 'next/link';

export default function DashboardNav() {
  // Записываем данные о рендере в глобальный объект
  if (typeof window !== 'undefined') {
    window.testdata ??= [];
    // Добавляем запись о каждом рендере
    window.testdata.push({
      timestamp: Date.now(),
      path: window.location.pathname
    });
  }
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex space-x-8">
            <Link
              href="/nextjs/nextjs05"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/nextjs/nextjs05/settings"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              Settings
            </Link>
            <Link
              href="/nextjs/nextjs05/profile"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}