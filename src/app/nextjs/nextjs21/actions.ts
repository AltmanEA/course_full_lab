'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateInvoice } from "./data";

export async function updateInvoiceAction(formData: FormData) {
  const id = formData.get("id") as string;
  const customer_id = formData.get("customer_id") as string;
  const amount = Number(formData.get("amount")) * 100;
  const status = formData.get("status") as "pending" | "paid" | "void";

  updateInvoice(id, { customer_id, amount, status });

  revalidatePath("/invoices");
  redirect("/nextjs/nextjs21/invoices");
}