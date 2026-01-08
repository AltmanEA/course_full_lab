import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Next.js 25: Обработка 404 ошибок</h1>
      <p>Изучаем notFound() и not-found.tsx</p>
      <Link href="/nextjs/nextjs25/invoices">Список инвойсов</Link>
    </div>
  );
}