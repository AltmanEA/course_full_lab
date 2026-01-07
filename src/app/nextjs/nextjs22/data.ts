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
    {
      id: "3",
      customer_id: "customer_3",
      amount: 5000,
      status: "void",
      date: "2024-01-25",
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

export function deleteInvoice(id: string): void {
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index !== -1) {
    invoices.splice(index, 1);
  }
}