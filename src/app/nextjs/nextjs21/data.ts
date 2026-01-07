// Глобальная переменная для хранения данных между запросами
const globalForInvoices = global as unknown as { invoices: Invoice[] };

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number; // в центах
  status: "pending" | "paid" | "void";
  date: string;
}

// Инициализация данных (только один раз)
export const invoices: Invoice[] =
  globalForInvoices.invoices || [
    {
      id: "1",
      customer_id: "customer_1",
      amount: 10000,
      status: "paid",
      date: "2024-01-15",
    },
    {
      id: "2",
      customer_id: "customer_2",
      amount: 25000,
      status: "pending",
      date: "2024-01-20",
    },
  ];

if (process.env.NODE_ENV !== "production") {
  globalForInvoices.invoices = invoices;
}

export const customers = [
  { id: "customer_1", name: "Acme Corp" },
  { id: "customer_2", name: "Globex Inc" },
  { id: "customer_3", name: "Soylent Corp" },
];

export function getInvoices(): Invoice[] {
  return invoices;
}

export function getInvoiceById(id: string): Invoice | undefined {
  return invoices.find((inv) => inv.id === id);
}

export function updateInvoice(
  id: string,
  data: { customer_id: string; amount: number; status: "pending" | "paid" | "void" }
): Invoice | undefined {
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index === -1) return undefined;

  const invoice = invoices[index]!;
  invoices[index] = {
    id: invoice.id,
    customer_id: data.customer_id,
    amount: data.amount,
    status: data.status,
    date: invoice.date,
  };
  return invoices[index];
}