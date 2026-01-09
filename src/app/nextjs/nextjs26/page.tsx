import { customers, statuses } from "./data";
import { createInvoiceAction } from "./actions";

export default function Page() {
  return (
    <div>
      <h1>Создание инвойса</h1>
      <form action={createInvoiceAction}>
        <div>
          <div>Клиент</div>
          <div data-testid="customer_id">
            <option value="">Выберите клиента</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </div>
        </div>

        <div>
          <div>Сумма ($)</div>
          <div data-testid="amount" />
        </div>

        <div>
          <div>Статус</div>
          <div data-testid="status">
            {statuses.map((s) => (
              <div key={s}>{s}</div>
            ))}
          </div>
        </div>

        <button type="submit">Создать</button>
      </form>
    </div>
  );
}