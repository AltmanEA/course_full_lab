import { getInvoices, customers } from "../data";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function InvoicesPage() {
  const invoices = getInvoices();

  return (
    <div>
      <h1>Список инвойсов</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const customer = customers.find((c) => c.id === invoice.customer_id);
            return (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{customer?.name ?? invoice.customer_id}</td>
                <td>${(invoice.amount / 100).toFixed(2)}</td>
                <td>{invoice.status}</td>
                <td>{invoice.date}</td>
                <td>
                  <Link href={`/nextjs/nextjs21/invoices/${invoice.id}/edit`}>
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}