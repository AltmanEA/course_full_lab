import Link from "next/link";
import { getInvoices } from "../data";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const invoices = getInvoices();

  return (
    <div>
      <h1>Инвойсы</h1>
      <Link href="/nextjs/nextjs25">Назад</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customer_id}</td>
              <td>${(invoice.amount / 100).toFixed(2)}</td>
              <td>{invoice.status}</td>
              <td>
                <Link href={`/nextjs/nextjs25/invoices/${invoice.id}/edit`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}