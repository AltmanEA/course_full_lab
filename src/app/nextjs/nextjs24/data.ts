// Глобальная переменная для хранения данных между запросами
const globalForInvoices = global as unknown as { invoices: Invoice[] };

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
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
];

export function getInvoices(): Invoice[] {
  return invoices;
}

// Имитация fetch с ошибкой
export async function fetchInvoicesWithError(): Promise<Invoice[]> {
  // Имитируем ошибку сети/сервера
  throw new Error("Ошибка загрузки данных: не удалось получить список инвойсов");
}
