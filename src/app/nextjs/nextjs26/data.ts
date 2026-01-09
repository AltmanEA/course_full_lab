export const customers = [
  { id: "customer_1", name: "Alice Johnson" },
  { id: "customer_2", name: "Bob Smith" },
  { id: "customer_3", name: "Carol White" },
];

export const statuses = ["pending", "paid", "void"];

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  status: string;
}

const invoices: Invoice[] = [
  { id: "1", customer_id: "customer_1", amount: 10000, status: "pending" },
  { id: "2", customer_id: "customer_2", amount: 20000, status: "paid" },
];

export function getInvoiceById(id: string): Invoice | undefined {
  return invoices.find((inv) => inv.id === id);
}