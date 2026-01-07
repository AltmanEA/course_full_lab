import { createInvoice } from "./actions";
import { customers } from "./data";

export default function Page() {
  return (
    <div>
      <h1>Создание инвойса</h1>
      <form action={createInvoice}>
        <div>
          <label htmlFor="customer_id">Customer</label>
          <select id="customer_id" name="customer_id" required>
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
            required
          />
        </div>

        <div>
          <label>Status</label>
          <div>
            <label>
              <input type="radio" name="status" value="pending" />
              Pending
            </label>
            <label>
              <input type="radio" name="status" value="paid" />
              Paid
            </label>
            <label>
              <input type="radio" name="status" value="void" />
              Void
            </label>
          </div>
        </div>

        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}