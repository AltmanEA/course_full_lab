import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>nextjs21 - Обновление инвойса с использованием динамического маршрута</h1>
      <p>
        <Link href="/nextjs/nextjs21/invoices">Перейти к списку инвойсов</Link>
      </p>
    </div>
  );
}