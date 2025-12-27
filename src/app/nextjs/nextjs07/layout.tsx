import Link from "next/link";

export default function Nextjs07Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Добавьте стилизацию для активной ссылки
  const navLinks = [
    { href: "/nextjs/nextjs07", label: "Home" },
    { href: "/nextjs/nextjs07/page1", label: "Page 1" },
    { href: "/nextjs/nextjs07/page2", label: "Page 2" },
    { href: "/nextjs/nextjs07/page3", label: "Page 3" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Next.js 07 Navigation</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}