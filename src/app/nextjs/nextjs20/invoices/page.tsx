import { getInvoices } from "../data";
import Link from "next/link";

export default function InvoicesPage() {
  const invoices = getInvoices();

  return (
    <div>
      <h1>Invoices</h1>
      <Link href="/nextjs/nextjs20">Create New Invoice</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customer_id}</td>
              <td>${(inv.amount / 100).toFixed(2)}</td>
              <td>{inv.status}</td>
              <td>{inv.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}