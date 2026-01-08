import Link from "next/link";
import { getInvoiceById, customers } from "../../../data";
import { updateInvoiceAction } from "../../../actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const invoice = getInvoiceById(id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div>
      <h1>Редактирование инвойса</h1>
      <Link href="/nextjs/nextjs25/invoices">Назад к списку</Link>
      <form action={updateInvoiceAction}>
        <input type="hidden" name="id" value={id} />

        <div>
          <label htmlFor="customer_id">Customer</label>
          <select
            id="customer_id"
            name="customer_id"
            defaultValue={invoice.customer_id}
            required
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            defaultValue={(invoice.amount / 100).toFixed(2)}
            required
          />
        </div>

        <div>
          <label>Status</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={invoice.status === "pending"}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="paid"
                defaultChecked={invoice.status === "paid"}
              />
              Paid
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="void"
                defaultChecked={invoice.status === "void"}
              />
              Void
            </label>
          </div>
        </div>

        <button type="submit">Update Invoice</button>
      </form>
    </div>
  );
}