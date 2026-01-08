'use server';

import { createInvoiceData } from "./data";

export async function createInvoice(formData: FormData) {
  const customer_id = formData.get("customer_id") as string;
  const amount = Number(formData.get("amount"));
  const status = formData.get("status") as "pending" | "paid" | "void";

  // TODO: Добавить try/catch, revalidatePath и redirect
  createInvoiceData({ customer_id, amount, status });
}