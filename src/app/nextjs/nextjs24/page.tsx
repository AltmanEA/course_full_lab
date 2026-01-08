import Link from "next/link";

export default function Nextjs24Page() {
  return (
    <div>
      <h1>Задание nextjs24 - Error Boundary</h1>
      <p>
        <Link href="/nextjs/nextjs24/invoices">
          Перейти на страницу инвойсов (с ошибкой)
        </Link>
      </p>
    </div>
  );
}