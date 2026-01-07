// Коллекция инвойсов
export interface Invoice {
  id: string;
  customer_id: string;
  amount: number; // в центах
  status: "pending" | "paid" | "void";
  date: string;
}

export const invoices: Invoice[] = [
  {
    id: "1",
    customer_id: "customer_1",
    amount: 10000,
    status: "paid",
    date: "2024-01-15",
  },
];

export const customers = [
  { id: "customer_1", name: "Acme Corp" },
  { id: "customer_2", name: "Globex Inc" },
  { id: "customer_3", name: "Soylent Corp" },
];

export function getInvoices(): Invoice[] {
  return invoices;
}

export function addInvoice(invoice: Omit<Invoice, "id">): Invoice {
  const newInvoice: Invoice = {
    ...invoice,
    id: Math.random().toString(36).substring(2, 9),
  };
  invoices.push(newInvoice);
  return newInvoice;
}