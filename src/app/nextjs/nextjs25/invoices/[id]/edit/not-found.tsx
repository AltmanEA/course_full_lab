import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Страница не найдена</h1>
      <p>Запрошенный инвойс не существует.</p>
      <Link href="/nextjs/nextjs25/invoices">Вернуться к списку инвойсов</Link>
    </div>
  );
}