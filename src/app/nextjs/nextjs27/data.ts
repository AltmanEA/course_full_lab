export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  status: string;
}

// Коллекция вместо базы данных
const invoices: Invoice[] = [
  { id: "1", customer_id: "customer_1", amount: 10000, status: "pending" },
  { id: "2", customer_id: "customer_2", amount: 20000, status: "paid" },
];

export function getInvoices() {
  return invoices;
}

export function createInvoice(data: Omit<Invoice, "id">): Invoice {
  const newInvoice: Invoice = {
    id: String(invoices.length + 1),
    ...data,
  };
  invoices.push(newInvoice);
  return newInvoice;
}