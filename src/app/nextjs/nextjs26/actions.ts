"use server";

export async function createInvoiceAction(formData: FormData) {
  const customer_id = formData.get("customer_id") as string;
  const amount = formData.get("amount") as string;
  const status = formData.get("status") as string;

  console.log("Creating invoice:", { customer_id, amount, status });
}