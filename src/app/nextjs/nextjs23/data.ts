// Глобальная переменная для хранения данных между запросами
const globalForInvoices = global as unknown as { invoices: Invoice[] };

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid" | "void";
  date: string;
}

// Инициализация данных
export const invoices: Invoice[] =
  globalForInvoices.invoices || [
    {
      id: "1",
      customer_id: "customer_1",
      amount: 10000,
      status: "paid",
      date: "2024-01-15",
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

// Функция создания инвойса с намеренной ошибкой
export function createInvoiceData(data: Omit<Invoice, "id" | "date">): Invoice {
  // Имитация ошибки при amount < 1000
  if (data.amount < 1000) {
    throw new Error("Invalid amount: minimum is 1000 cents");
  }

  const newInvoice: Invoice = {
    id: String(invoices.length + 1),
    customer_id: data.customer_id,
    amount: data.amount,
    status: data.status,
    date: new Date().toISOString().split("T")[0] ?? "",
  };

  invoices.push(newInvoice);
  return newInvoice;
}